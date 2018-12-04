/**
 *
 *  页面路由
 */
var express = require("express");
var site = require("./controllers/site");
var router = express.Router();

// home page
router.get("/", site.index);
router.get("/register", site.register);
router.get("/login", site.login);
module.exports = router;
