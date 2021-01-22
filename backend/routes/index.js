////////------------------------------------MANO----------------------------------------//////////

const express = require("express");
const router = express.Router();

const words = ["zebra", "crocodile", "red", "apple", "green", "pencil"];

const NodeCache = require("node-cache");
const myCache = new NodeCache();

router.post("/", function (req, res, next) {
  const random = Math.floor(Math.random() * words.length);
  const selectedWord = words[random];
  const gameState = {
    selectedWord: selectedWord,
    wrongLetters: [],
    correctLetters: [],
    showNotification: false,
    won: false,
    endgame: false,
  };
  myCache.set(req.body.id, gameState, 10000);
  res.send(gameState);
});

router.post("/sendLetter", function (req, res, next) {
  const letter = req.body.letter;
  const id = req.body.id;
  const gameState = myCache.get(id);

  if (gameState.selectedWord.includes(letter)) {
    if (!gameState.correctLetters.includes(letter)) {
      gameState.correctLetters = [...gameState.correctLetters, letter];
    } else {
      gameState.showNotification = true;
    }
  } else {
    if (!gameState.wrongLetters.includes(letter)) {
      gameState.wrongLetters = [...gameState.wrongLetters, letter];
    } else {
      gameState.showNotification = true;
    }
  }

  gameState.won = checkWin(
    gameState.correctLetters,
    gameState.wrongLetters,
    gameState.selectedWord
  );

  if (gameState.won === "win" || gameState.won === "lose") {
    gameState.endgame = true;
  }
  myCache.set(req.body.id, gameState, 10000);
  res.send(gameState);
});

function checkWin(correct, wrong, word) {
  let status = "win";

  word.split("").forEach((letter) => {
    if (!correct.includes(letter)) {
      status = "";
    }
  });

  if (wrong.length === 10) status = "lose";

  return status;
}

module.exports = router;
