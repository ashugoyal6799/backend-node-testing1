require("dotenv").config;

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory list of users
let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

// GET / - Welcome message
app.get("/", (req, res) => {
  res.send("Welcome to the Express Web Server!");
});

// GET /users - Returns a list of users
app.get("/users", (req, res) => {
  res.json(users);
});

// POST /add-user - Adds a user to the list
app.post("/add-user", (req, res) => {
  const newUser = req.body;
  if (newUser && newUser.name) {
    newUser.id = users.length + 1; // Assign an ID to the new user
    users.push(newUser);
    res.status(201).json({ message: "User added successfully", user: newUser });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
