var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const data = { data: "hello from the server" };
  res.send(data);
});

module.exports = router;
