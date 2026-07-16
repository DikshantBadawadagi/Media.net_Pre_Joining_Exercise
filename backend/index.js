const express = require("express");

const app = express();
const PORT = 8000;

app.use(express.json());

let books = [
    {
        id: 1,
        title: "Atomic Habits",
        author: "James Clear",
        price: 499
    },
    {
        id: 2,
        title: "The Alchemist",
        author: "Paulo Coelho",
        price: 399
    },
    {
        id: 3,
        title: "Clean Code",
        author: "Robert C. Martin",
        price: 699
    }
];

app.get("/books", (req, res) => {
    res.status(200).json({
        totalBooks: books.length,
        books: books
    });
});

app.get("/books/:id", (req, res) => {
    const id = Number(req.params.id);

    const book = books.find(book => book.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found."
        });
    }

    res.json(book);
});

app.post("/books", (req, res) => {
    const { title, author, price } = req.body;

    if (!title || !author || price === undefined) {
        return res.status(400).json({
            message: "Title, author and price are required."
        });
    }

    const newBook = {
        id: books.length ? books[books.length - 1].id + 1 : 1,
        title,
        author,
        price
    };

    books.push(newBook);

    res.status(201).json({
        message: "Book added successfully.",
        book: newBook
    });
});

app.put("/books/:id", (req, res) => {
    const id = Number(req.params.id);

    const book = books.find(book => book.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found."
        });
    }

    const { title, author, price } = req.body;

    if (title) book.title = title;
    if (author) book.author = author;
    if (price !== undefined) book.price = price;

    res.json({
        message: "Book updated successfully.",
        book
    });
});

app.delete("/books/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = books.findIndex(book => book.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Book not found."
        });
    }

    const deletedBook = books.splice(index, 1);

    res.json({
        message: "Book deleted successfully.",
        deletedBook: deletedBook[0]
    });
});

app.listen(PORT, () => {
    console.log(`Book API is running on http://localhost:${PORT}`);
});