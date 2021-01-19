import React, { useState } from "react";

const EnterForm = () => {
  const [letter, setLetter] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { letter: letter };
    console.log(JSON.stringify(data));
    try {
      fetch(`http://127.0.0.1:9000/sendLetter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>Enter your letter:</p>
        <input
          type="text"
          required
          maxLength="1"
          minLength="1"
          pattern="[A-Za-z]"
          title="Please enter only alphabetical letters"
          id="letter"
          name="letter"
          onChange={(e) => setLetter(e.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default EnterForm;
