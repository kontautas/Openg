////////------------------------------------MANO----------------------------------------//////////

const express = require("express");
const router = express.Router();

const words = ["zebra", "crocodile", "red", "apple", "green", "pencil"];

const NodeCache = require("node-cache");
const myCache = new NodeCache();

router.post("/", function (req, res, next) {
  const random = Math.floor(Math.random() * words.length);
  const selectedWord = words[random];
  const obj = {
    selectedWord: selectedWord,
    wrongLetters: [],
    correctLetters: [],
    showNotification: false,
    won: false,
    endgame: false,
  };
  myCache.set(req.body.id, obj, 10000);
  res.send(obj);
});

router.post("/sendLetter", function (req, res, next) {
  const letter = req.body.letter;
  const id = req.body.id;
  const obj = myCache.get(id);

  if (obj.selectedWord.includes(letter)) {
    if (!obj.correctLetters.includes(letter)) {
      obj.correctLetters = [...obj.correctLetters, letter];
    } else {
      obj.showNotification = true;
    }
  } else {
    if (!obj.wrongLetters.includes(letter)) {
      obj.wrongLetters = [...obj.wrongLetters, letter];
    } else {
      obj.showNotification = true;
    }
  }

  obj.won = checkWin(obj.correctLetters, obj.wrongLetters, obj.selectedWord);

  if (obj.won === "win" || obj.won === "lose") {
    obj.endgame = true;
  }
  myCache.set(req.body.id, obj, 10000);
  res.send(obj);
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
