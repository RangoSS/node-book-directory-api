const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Optional if you use express.json()
const booksRouter = require('./routes/books');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Parses JSON request bodies

// Routes
app.use('/api/books', booksRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
