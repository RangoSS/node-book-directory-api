const express = require('express');
const fs = require('fs');
const router = express.Router();
const dataPath = './data/books.json';

// Helper function to read books from JSON file
const readBooksFromFile = () => {
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data);
};

// Helper function to write books to JSON file
const writeBooksToFile = (books) => {
    fs.writeFileSync(dataPath, JSON.stringify(books, null, 2));
};

// GET: Retrieve all books
router.get('/', (req, res) => {
    const books = readBooksFromFile();
    res.json(books);
});

// GET: Retrieve a specific book by ISBN
router.get('/:isbn', (req, res) => {
    const books = readBooksFromFile();
    const book = books.find(b => b.ISBN === req.params.isbn);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

// POST: Add a new book
router.post('/', (req, res) => {
    const { title, author, publisher, publishedDate, ISBN } = req.body;

    if (!title || !author || !publisher || !publishedDate || !ISBN) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const books = readBooksFromFile();
    const newBook = { title, author, publisher, publishedDate, ISBN };
    books.push(newBook);
    writeBooksToFile(books);
    res.status(201).json(newBook);
});

// PUT: Update an existing book
router.put('/:isbn', (req, res) => {
    const books = readBooksFromFile();
    const index = books.findIndex(b => b.ISBN === req.params.isbn);
    if (index === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }

    const { title, author, publisher, publishedDate } = req.body;
    const updatedBook = { ...books[index], title, author, publisher, publishedDate };
    books[index] = updatedBook;
    writeBooksToFile(books);
    res.json(updatedBook);
});

// DELETE: Remove a book
router.delete('/:isbn', (req, res) => {
    const books = readBooksFromFile();
    const index = books.findIndex(b => b.ISBN === req.params.isbn);
    if (index === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }

    books.splice(index, 1);
    writeBooksToFile(books);
    res.status(204).send();
});

module.exports = router;
