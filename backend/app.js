// app.js

const api = new BookApiClient();

async function testApi() {
    try {
        // 1. Fetch all books
        const books = await api.getAllBooks();
        console.log("All Books:");
        console.log(books);

        // 2. Fetch a single book
        const book = await api.getBookById(1);
        console.log("\nBook with ID 1:");
        console.log(book);

        // 3. Create a new book
        const createdBook = await api.createBook({
            title: "Deep Work",
            author: "Cal Newport",
            price: 550
        });

        console.log("\nCreated Book:");
        console.log(createdBook);

        // 4. Update the newly created book
        const updatedBook = await api.updateBook(createdBook.book.id, {
            price: 600
        });

        console.log("\nUpdated Book:");
        console.log(updatedBook);

        // 5. Delete the book
        const deletedBook = await api.deleteBook(createdBook.book.id);

        console.log("\nDeleted Book:");
        console.log(deletedBook);

    } catch (error) {
        console.error("API Error:", error.message);
    }
}

testApi();