var express = require("express");
var test = require("./api/v1/test");

var router = express.Router();

// nothing
router.get("/api", test.test);

module.exports = router;
