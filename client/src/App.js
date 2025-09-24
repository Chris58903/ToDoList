import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState(""); // state to hold backend message

  useEffect(() => {
    // when component loads, fetch from backend
    fetch("http://localhost:3001/hello")
      .then((res) => res.text()) // get text response
      .then((data) => setMessage(data)) // store in state
      .catch((err) => console.error("Error fetching:", err));
  }, []);

  return (
    <div className="App">
      <h1>Frontend + Backend Test</h1>
      <p>Message from backend: {message}</p>
    </div>
  );
}

export default App;
