var express = require("express");
var test = require("./api/v1/test");
var apiv1 = require("./api/v1");
var topicsApi = apiv1.topics;
var usersApi = apiv1.users;
var router = express.Router();

// nothing
router.get("/test", test.test);
router.get("/testSession", test.sessionTest);
router.post("/genarateTopics", test.genarateTopics);
router.post("/queryTopicList", topicsApi.getTopicListByQuery);
router.post("/checkUser", usersApi.checkUser);
router.post("/register", usersApi.register);
router.post("/login", usersApi.login);
module.exports = router;
