// BookApiClient.js

class BookApiClient {
    constructor(baseUrl = "http://localhost:8000") {
        this.baseUrl = baseUrl;
    }

    // Fetch all books
    async getAllBooks() {
        const response = await fetch(`${this.baseUrl}/books`);

        if (!response.ok) {
            throw new Error(`Failed to fetch books (${response.status})`);
        }

        return response.json();
    }

    // Fetch a single book by ID
    async getBookById(id) {
        const response = await fetch(`${this.baseUrl}/books/${id}`);

        if (!response.ok) {
            throw new Error(`Book with ID ${id} not found`);
        }

        return response.json();
    }

    // Create a new book
    async createBook(book) {
        const response = await fetch(`${this.baseUrl}/books`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        });

        if (!response.ok) {
            throw new Error(`Failed to create book (${response.status})`);
        }

        return response.json();
    }

    // Update an existing book
    async updateBook(id, updatedData) {
        const response = await fetch(`${this.baseUrl}/books/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) {
            throw new Error(`Failed to update book (${response.status})`);
        }

        return response.json();
    }

    // Delete a book
    async deleteBook(id) {
        const response = await fetch(`${this.baseUrl}/books/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(`Failed to delete book (${response.status})`);
        }

        return response.json();
    }
}