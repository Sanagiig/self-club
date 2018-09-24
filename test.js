var redis = require("ioredis");

// var r = new redis({
//   host: "47.100.183.40",
//   port: 6379,
//   db: 0,
//   passwo
// });

var r = new redis({
  port: 6379,
  host: "47.100.183.40",
  db: 0,
  password: "laiwenjun@1993"
});

r.on("success", function() {
  console.log("suc");
});

r.on("error", function(err) {
  console.log("err", err);
});

r.get("name", function(err, data) {
  console.log(data);
});
