import React, { useState, useEffect, useRef } from "react";

const EnterForm = (props) => {
  const [letter, setLetter] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { letter: letter, id: props.id };
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
          props.changeCorrectLetters(data.correctLetters);
          props.changeWrongLetters(data.wrongLetters);
          props.changeShowNotification(data.showNotification);
          props.changeWon(data.won);
          props.changeEndgame(data.endgame);
        })
        .then(e.target.reset());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>Enter your letter:</p>
        <input
          ref={inputRef}
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
