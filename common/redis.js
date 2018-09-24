var config = require("../config.default");
var Redis = require("ioredis");
var logger = require("./logger");

var client = new Redis({
  port: config.redis_port,
  host: config.redis_host,
  db: config.redis_db,
  password: config.redis_password
});

client.on("success", function() {
  console.log("redis suc ", arguments);
  logger.info(
    "connect redis at",
    config.redis_host,
    "port",
    config.redis_port,
    "success"
  );
});
client.on("error", function(err) {
  console.log("redis connecting");
  if (err) {
    logger.error("connect to redis error, check your redis config", err);
    process.exit(1);
  }
});

exports = module.exports = client;
