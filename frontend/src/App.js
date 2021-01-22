////////------------------------------------MANO----------------------------------------//////////

import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Figure from "./components/Figure";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import Notification from "./components/Notification";
import Popup from "./components/Popup";
import EnterForm from "./components/EnterForm";
import { showNotification as show } from "./helpers/Helpers";

function App() {
  const [selectedWord, setSelectedWord] = useState("");
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [won, setWon] = useState(false);
  const [endgame, setEndgame] = useState(false);

  useEffect(() => {
    const time = new Date();
    const data = { id: time.getTime() };
    sessionStorage.setItem("id", time.getTime());

    try {
      fetch(`http://127.0.0.1:9000/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          setSelectedWord(data.selectedWord);
          setCorrectLetters(data.correctLetters);
          setWrongLetters(data.wrongLetters);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    if (showNotification) {
      show(setShowNotification);
    }
  }, [showNotification]);

  return (
    <div>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        won={won}
        endgame={endgame}
      />
      <Notification showNotification={showNotification} />
      <EnterForm
        id={sessionStorage.getItem("id")}
        changeWrongLetters={(value) => setWrongLetters(value)}
        changeCorrectLetters={(value) => setCorrectLetters(value)}
        changeShowNotification={(value) => setShowNotification(value)}
        changeWon={(value) => setWon(value)}
        changeEndgame={(value) => setEndgame(value)}
      />
    </div>
  );
}

export default App;
