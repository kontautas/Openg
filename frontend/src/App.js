import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Figure from "./components/Figure";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import Notification from "./components/Notification";
import Popup from "./components/Popup";
import EnterForm from "./components/EnterForm";
import { showNotification as show } from "./helpers/helpers";
const words = ["application", "programming", "interface", "wizard"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
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
  function playAgain() {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }
  return (
    <div>
      <Header></Header>
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
      <Notification showNotification={showNotification} />
      <EnterForm />
    </div>
  );
}

export default App;
