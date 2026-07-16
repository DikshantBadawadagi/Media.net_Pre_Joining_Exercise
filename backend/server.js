const express = require("express");

const app = express();
const PORT = 3000;

let users = [
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob", role: "user" },
];

app.use(express.json());

function requestLogger(req, res, next) {
  console.log(req.method, req.url);
  next();
}

app.use(requestLogger);

function findUserById(userId) {
  return users.find((user) => user.id === userId);
}

app.get("/health", (req, res) => {
  res.send("OK");
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = findUserById(userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

app.post("/users", (req, res) => {
  const { name, role } = req.body;

  const newUser = {
    id: users.length + 1,
    name,
    role: role || "user",
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

app.delete("/users/:id", (req, res) => {
  const userId = Number(req.params.id);

  if (!findUserById(userId)) {
    return res.status(404).json({ error: "User not found" });
  }

  users = users.filter((user) => user.id !== userId);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
