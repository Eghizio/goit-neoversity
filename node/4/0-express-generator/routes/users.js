var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  const user = req.query.username;
  res.send(user ?? "respond with a resource");
});

module.exports = router;
