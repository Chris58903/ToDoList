import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Fetch todos on mount
  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error("Error fetching todos:", err));
  }, []);

  // Add a new todo
  const addTodo = () => {
    if (!newTodo) return;

    fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newTodo })
    })
      .then(res => res.json())
      .then(todo => {
        setTodos([...todos, todo]); 
        setNewTodo("");             
      })
      .catch(err => console.error("Error adding todo:", err));
  };

  return (
    <div className="App">
      <h1>My Todo List</h1>

      {/* Add Todo Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
      >
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
        <button type="submit">Add Todo</button>
      </form>

      {/* Todo List */}
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.completed ? <s>{todo.text}</s> : todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
