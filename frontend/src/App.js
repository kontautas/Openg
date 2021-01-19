import "./App.css";
import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    fetchData();
  });
  const fetchData = async () => {
    try {
      await fetch(`http://127.0.0.1:9000/`, {
        method: "GET",
        "Content-Type": "application/json",
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    } catch (err) {
      console.log(err);
    }
  };
  return <div>Hey</div>;
}

export default App;
