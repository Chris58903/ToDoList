const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./todo.db", (err) => {
  if (err) console.error("Database opening error: ", err);
  else console.log("Database connected!");
});

db.run(
  `CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT,
    completed BOOLEAN DEFAULT 0
  )`,
  (err) => {
    if (err) console.error("Table creation error: ", err);
    else console.log("Todos table ready!");
  }
);

module.exports = db;
