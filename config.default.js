var path = require("path");

var config = {
  name: "Node-Club", // 社区名字
  description: "Node 试验品", // 社区的描述
  keywords: "nodejs, node, express, connect, socket.io",

  //日志目录
  log_dir: path.join(__dirname, "logs"),
  // debug 为 true 时，用于本地调试
  debug: true,

  // 程序运行的端口
  port: 3000,

  // 话题列表显示的话题数量
  list_topic_count: 20,

  // redis 配置，默认是本地
  redis_host: "47.100.183.40",
  redis_port: 6379,
  redis_db: 0,
  redis_password: "laiwenjun@1993",

  // mongodb 配置
  db: "mongodb://47.100.183.40/node_club_dev",

  // 文件上传配置
  // 注：如果填写 qn_access，则会上传到 7牛，以下配置无效
  upload: {
    path: path.join(__dirname, "public/upload/"),
    url: "/public/upload/"
  },

  file_limit: "1MB",

  // 版块
  tabs: [["share", "分享"], ["ask", "问答"], ["job", "招聘"]],

  create_post_per_day: 1000, // 每个用户一天可以发的主题数
  create_reply_per_day: 1000, // 每个用户一天可以发的评论数
  create_user_per_ip: 1000,
  visit_per_day: 1000 // 每个 ip 每天能访问的次数
};

module.exports = config;
