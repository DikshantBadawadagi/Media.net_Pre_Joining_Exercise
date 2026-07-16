# User Management REST API

A lightweight Express.js REST API for managing users. Data is stored in memory, making this project ideal for learning HTTP fundamentals, REST conventions, and Express middleware without database setup.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [API Reference](#api-reference)
  - [Health Check](#health-check)
  - [List All Users](#list-all-users)
  - [Get User by ID](#get-user-by-id)
  - [Create User](#create-user)
  - [Delete User](#delete-user)
- [Error Responses](#error-responses)
- [Example Workflow](#example-workflow)
- [Project Structure](#project-structure)
- [Notes & Limitations](#notes--limitations)

---

## Project Overview

This API exposes a small set of CRUD-style endpoints for a `users` resource. It is designed to be simple and beginner-friendly while following common Node.js and Express patterns:

- JSON request and response bodies
- Meaningful HTTP status codes (`200`, `201`, `404`)
- Request logging middleware
- In-memory data store with seed users

**Base URL:** `http://localhost:3000`

**Seed data** (available on server start):

| id | name  | role  |
|----|-------|-------|
| 1  | Alice | admin |
| 2  | Bob   | user  |

> **Note:** All user data is stored in memory. Restarting the server resets the dataset to the seed values above.

---

## Tech Stack

| Technology | Purpose                          |
|------------|----------------------------------|
| Node.js    | JavaScript runtime               |
| Express 5  | Web framework and routing        |

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (included with Node.js)

Verify your installation:

```bash
node --version
npm --version
```

---

## Installation

1. Clone or download the repository.

2. Navigate to the backend directory:

   ```bash
   cd backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

This installs Express and its dependencies into `node_modules/`.

---

## Running the Server

Start the server with:

```bash
npm start
```

You should see:

```text
Server running on port 3000
```

The API is now available at `http://localhost:3000`.

Each incoming request is logged to the console in the format:

```text
GET /users
POST /users
```

To stop the server, press `Ctrl + C` in the terminal.

---

## API Reference

### Health Check

Check whether the server is running.

| Method | Endpoint  | Description        |
|--------|-----------|--------------------|
| `GET`  | `/health` | Server health ping |

**Response:** `200 OK`

**Body:** Plain text

```text
OK
```

**Example (curl):**

```bash
curl http://localhost:3000/health
```

---

### List All Users

Retrieve every user in the system.

| Method | Endpoint | Description    |
|--------|----------|----------------|
| `GET`  | `/users` | List all users |

**Response:** `200 OK`

**Body:** JSON array of user objects

```json
[
  {
    "id": 1,
    "name": "Alice",
    "role": "admin"
  },
  {
    "id": 2,
    "name": "Bob",
    "role": "user"
  }
]
```

**Example (curl):**

```bash
curl http://localhost:3000/users
```

---

### Get User by ID

Retrieve a single user by their numeric ID.

| Method | Endpoint      | Description       |
|--------|---------------|-------------------|
| `GET`  | `/users/:id`  | Get user by ID    |

**URL Parameters:**

| Parameter | Type   | Description        |
|-----------|--------|--------------------|
| `id`      | number | Unique user ID     |

**Response:** `200 OK`

**Body:** JSON user object

```json
{
  "id": 1,
  "name": "Alice",
  "role": "admin"
}
```

**Example (curl):**

```bash
curl http://localhost:3000/users/1
```

---

### Create User

Add a new user to the system.

| Method | Endpoint | Description  |
|--------|----------|--------------|
| `POST` | `/users` | Create a user |

**Request Headers:**

| Header         | Value              | Required |
|----------------|--------------------|----------|
| `Content-Type` | `application/json` | Yes      |

**Request Body:**

| Field  | Type   | Required | Default  | Description          |
|--------|--------|----------|----------|----------------------|
| `name` | string | No*      | —        | Display name         |
| `role` | string | No       | `"user"` | User role            |

\*The API does not validate required fields; omitting `name` will create a user with a `null`/`undefined` name.

**Example Request:**

```json
{
  "name": "Charlie",
  "role": "user"
}
```

**Response:** `201 Created`

**Body:** The newly created user object

```json
{
  "id": 3,
  "name": "Charlie",
  "role": "user"
}
```

New user IDs are assigned as `current user count + 1`.

**Example (curl):**

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"Charlie\", \"role\": \"user\"}"
```

**Minimal request** (role defaults to `"user"`):

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"Charlie\"}"
```

---

### Delete User

Remove a user by ID.

| Method   | Endpoint      | Description     |
|----------|---------------|-----------------|
| `DELETE` | `/users/:id`  | Delete a user   |

**URL Parameters:**

| Parameter | Type   | Description    |
|-----------|--------|----------------|
| `id`      | number | User ID to delete |

**Response:** `200 OK`

**Body:**

```json
{
  "success": true
}
```

**Example (curl):**

```bash
curl -X DELETE http://localhost:3000/users/2
```

---

## Error Responses

The API returns JSON error objects for missing resources.

### User Not Found — `404 Not Found`

Returned when a `GET` or `DELETE` request targets a user ID that does not exist.

**Response Body:**

```json
{
  "error": "User not found"
}
```

**Examples:**

```bash
# GET non-existent user
curl http://localhost:3000/users/999

# DELETE non-existent user
curl -X DELETE http://localhost:3000/users/999
```

Both return:

```json
{
  "error": "User not found"
}
```

### Summary of Status Codes

| Status Code | Meaning       | When Used                              |
|-------------|---------------|----------------------------------------|
| `200`       | OK            | Successful GET, DELETE                 |
| `201`       | Created       | Successful POST (user created)         |
| `404`       | Not Found     | User ID does not exist                 |

---

## Example Workflow

A typical session using curl:

```bash
# 1. Verify the server is up
curl http://localhost:3000/health

# 2. List existing users
curl http://localhost:3000/users

# 3. Fetch a specific user
curl http://localhost:3000/users/1

# 4. Create a new user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"Charlie\"}"

# 5. Delete a user
curl -X DELETE http://localhost:3000/users/2

# 6. Confirm deletion (Bob should be gone)
curl http://localhost:3000/users
```

---

## Project Structure

```text
backend/
├── node_modules/     # Installed dependencies (generated)
├── package.json      # Project metadata and scripts
├── package-lock.json # Locked dependency versions
├── server.js         # Express application entry point
└── README.md         # This documentation
```

---

## Notes & Limitations

This API is intentionally minimal for learning purposes. Keep the following in mind:

- **In-memory storage** — Data is lost when the server restarts.
- **No persistence** — There is no database or file-based storage.
- **No authentication** — All endpoints are publicly accessible.
- **No input validation** — Invalid or missing fields are not rejected with `400` errors.
- **No update endpoint** — Users can be listed, retrieved, created, and deleted, but not updated (`PUT`/`PATCH` are not implemented).
- **ID assignment** — New IDs are based on `users.length + 1`, not the highest existing ID. After deletions, ID reuse gaps may occur.

---

## License

ISC
