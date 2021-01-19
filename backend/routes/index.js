var express = require("express");
var router = express.Router();

const words = ["zebra", "crocodile", "red", "apple", "green", "pencil"];

let selectedWord;
let letter;
let wrongLetters = [];
let correctLetters = [];

/* GET home page. */
router.get("/", function (req, res, next) {
  const random = Math.floor(Math.random() * words.length);
  selectedWord = words[random];
  let data = { wordLength: selectedWord };
  res.send(data);
});
router.post("/sendLetter", function (req, res, next) {
  console.log(req.body);
  let data = { name: selectedWord };
  res.send(data);
});
function checkWord() {
  if (selectedWord.includes(letter)) {
    if (!correctLetters.includes(letter)) {
      setCorrectLetters((currentLetters) => [...currentLetters, letter]);
    } else {
      //show(setShowNotification);
    }
  } else {
    if (!wrongLetters.includes(letter)) {
      setWrongLetters((currentLetters) => [...currentLetters, letter]);
    } else {
      //show(setShowNotification);
    }
  }
}
module.exports = router;
