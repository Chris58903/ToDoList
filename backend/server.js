// server.js
const express = require('express');
const cors = require('cors');
const db = require("./db");

const app = express();
const PORT = 3001; // backend runs on 3001 (React runs on 3000)

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get('/hello', (req, res) => {
  res.send('Hello from backend!');
});

// GET all todos
app.get("/todos", (req, res) => {
  db.all("SELECT * FROM todos", [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Error retrieving todos");
    } else {
      res.json(rows);
    }
  });
});


// POST a new todo
app.post("/todos", (req, res) => {
  const { text } = req.body;
  db.run(
    `INSERT INTO todos (text, completed) VALUES (?, 0)`,
    [text],
    function(err) {
      if (err) {
        console.error(err.message);
        res.status(500).send("Error adding todo");
      } else {
        res.json({ id: this.lastID, text, completed: 0 });
      }
    }
  );
});


// PUT update a todo
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;

  db.run(
    `UPDATE todos SET text = ?, completed = ? WHERE id = ?`,
    [text, completed, id],
    function(err) {
      if (err) {
        console.error(err.message);
        res.status(500).send("Error updating todo");
      } else {
        res.send(`Todo ${id} updated`);
      }
    }
  );
});


// DELETE a todo
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;

  db.run(`DELETE FROM todos WHERE id = ?`, [id], function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).send("Error deleting todo");
    } else {
      res.send(`Todo ${id} deleted`);
    }
  });
});



// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
