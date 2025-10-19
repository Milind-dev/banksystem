import React, { useEffect } from 'react';
import './App.css';

function App() {


  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then(res => res.json())
      .then(data => console.log("✅ Response from backend:", data))
      .catch(err => console.error("❌ Fetch error:", err));
  }, []);

  return (
    <div className="App">
      <h1>Welcome to the Bank System</h1>
    </div>
  );
}

export default App;
