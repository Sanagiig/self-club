var path = require("path");
var express = require("express");
var session = require("express-session");
var mongoStore = require("connect-mongo")(session);
var bodyParser = require("body-parser");
var cors = require("cors");
var ejs = require("consolidate").ejs;
var webRouter = require("./web_router");
var apiRouterV1 = require("./api_router_v1");
var logger = require("./common/logger");
// 静态文件目录
var staticDir = path.join(__dirname, "public");

var config = require("./config.default");

var app = express();

//通用的中间件
app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "1mb" }));
app.use(
  session({
    secret: "123456",
    name: "testapp",
    resave: false,
    cookie: { maxAge: 800000 },
    saveUninitialized: true,
    store: new mongoStore({
      // host: config.db_host,
      url: config.db,
      port: 27017,
      db: "node_club_dev"
    })
  })
);

// configuration in all env
app.set("views", path.join(__dirname, "views"));
app.engine(".html", ejs);
app.set("view engine", "html");

app.enable("trust proxy");

// static file
app.use("/public", express.static(staticDir));
// routes
app.use("/api/v1", cors(), apiRouterV1);
app.use("/", webRouter);

if (!module.parent) {
  app.listen(config.port, function() {
    logger.info("NodeClub listening on port", config.port);
    logger.info("God bless love....");
    logger.info(
      "You can debug your app with http://" +
        config.hostname +
        ":" +
        config.port
    );
    logger.info("");
  });
}

function doSomething() {}
