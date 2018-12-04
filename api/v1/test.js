var tabList = require("../../config.default").tabs;
var model = require("../../models");
var topicModel = model.Topic;

var test = function(req, res, next) {
  res.send("test");
};

// 生成字符串
var strFactory = function(count) {
  var random = Math.ceil(Math.random() * 25);
  var res = String.fromCharCode(65 + random);

  if (!count) count = Math.ceil(20 * Math.random() + 2);
  while (count-- > 0) {
    random = Math.ceil(Math.random() * 25);
    res += String.fromCharCode(97 + random);
  }
  return res;
};

// 生成句子
var strsFactory = function(count) {
  var res = "";
  if (!count) count = Math.ceil(15 * Math.random() + 1);
  while (count-- > 0) {
    res += strFactory();
    if (count) res += " ";
  }
  return res;
};

var genarateTopics = function(req, res, next) {
  var count = req.body.count;
  var tabIndex;
  var arr = [];
  console.log(req.body);
  if (count) {
    while (count-- > 0) {
      tabIndex = Math.floor(Math.random() * tabList.length);
      arr.push({
        title: strFactory(),
        content: strsFactory(),
        top: Math.random() >= 0.5,
        good: Math.random() >= 0.5,
        lock: Math.random() >= 0.5,
        reply_count: 0,
        visit_count: 0,
        collect_count: 0,
        content_is_html: Math.random() >= 0.5,
        tab: tabList[tabIndex][0],
        deleted: Math.random() >= 0.5
      });
    }

    topicModel.insertMany(arr, function(err, doc) {
      if (err) {
        res.json({
          status: "fail",
          code: "0",
          msg: "更新数据库失败"
        });
      } else {
        res.json({
          status: "success",
          code: "0",
          msg: "新增数据成功",
          data: doc,
          receive: req.body
        });
      }
    });
  } else {
    res.json({
      status: "error",
      code: "0",
      msg: "参数错误",
      data: "",
      receive: req.body
    });
  }
};

var sessionTest = function(req, res, next) {
  console.log(req.session);
  req.session.test = Date();
  res.send("test");
  console.log("after", req.session);
  console.log("after", res.session);
};

module.exports = {
  test,
  genarateTopics,
  sessionTest
};
