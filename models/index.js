// models
require("./user");
require("./topic");
require("./reply");
require("./topic_collect");
require("./message");

var mongoose = require("mongoose");
var config = require("../config.default");
var logger = require("../common/logger");

var connectDB = function() {
  mongoose.connect(
    config.db,
    { server: { poolSize: 20 } },
    function(err) {
      if (err) {
        logger.error("connect to %s error: ", config.db, err.message);
        connectDB();
      }
    }
  );
};

connectDB();

exports.User = mongoose.model("User");
exports.Topic = mongoose.model("Topic");
// exports.Reply = mongoose.model("Reply");
// exports.TopicCollect = mongoose.model("TopicCollect");
// exports.Message = mongoose.model("Message");
