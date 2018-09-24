/**
 * Module dependencies.
 */

var eventproxy = require("eventproxy");
var moment = require("moment");
var User = require("../proxy").User;
var Topic = require("../proxy").Topic;
// var cache = require("../common/cache");
var config = require("../config.default");
var renderHelper = require("../common/render_helper");

// exports.index = function(req, res, next) {
//   console.log("run index");
//   var page = parseInt(req.query.page, 10) || 1;
//   page = page > 0 ? page : 1;
//   var tab = req.query.tag || "all";

//   var proxy = new eventproxy();
//   proxy.fail(next);

//   //取主题
//   var query = {};
//   if (!tab || tab === "all") {
//     query.tab = { $nin: ["job", "dev"] };
//   } else {
//     if (tab === "good") {
//       query.good = true;
//     } else {
//       query.tag = tab;
//     }
//   }
//   //查询大于去年的
//   if (!query.good) {
//     query.create_at = {
//       $gte: moment()
//         .subtract(1, "years")
//         .toDate()
//     };
//   }
//   var limit = config.list_topic_count;
//   var options = {
//     skip: (page - 1) * limit,
//     limit: limit,
//     sort: "-top -last_reply_at"
//   };

//   Topic.getTopicsByQuery(
//     query,
//     options,
//     proxy.done("topics", function(topics) {
//       console.log("topic", topics);
//       return topics;
//     })
//   );

//   // 取排行榜上的用户
//   cache.get(
//     "tops",
//     proxy.done(function(tops) {
//       console.log("redis tops", tops);
//       if (tops) {
//         proxy.emit("tops", tops);
//       } else {
//         console.log("tops db search");
//         User.getUsersByQuery(
//           { is_block: false },
//           { limit: 10, sort: "-score" },
//           proxy.done("tops", function(tops) {
//             cache.set("tops", tops, 60 * 1);
//             console.log("top", tops);
//             return tops;
//           })
//         );
//       }
//     })
//   );

//   // END 取排行榜上的用户

//   // 取0回复的主题
//   cache.get(
//     "no_reply_topics",
//     proxy.done(function(no_reply_topics) {
//       if (no_reply_topics) {
//         proxy.emit("no_reply_topics", no_reply_topics);
//       } else {
//         Topic.getTopicsByQuery(
//           { reply_count: 0, tab: { $nin: ["job", "dev"] } },
//           { limit: 5, sort: "-create_at" },
//           proxy.done("no_reply_topics", function(no_reply_topics) {
//             cache.set("no_reply_topics", no_reply_topics, 60 * 1);
//             console.log("no_reply_topics", no_reply_topics);
//             return no_reply_topics;
//           })
//         );
//       }
//     })
//   );

//   // 取分页数据
//   var pagesCacheKey = JSON.stringify(query) + "pages";
//   cache.get(
//     pagesCacheKey,
//     proxy.done(function(pages) {
//       if (pages) {
//         proxy.emit("pages", pages);
//       } else {
//         Topic.getCountByQuery(
//           query,
//           proxy.done(function(all_topics_count) {
//             var pages = Math.ceil(all_topics_count / limit);
//             cache.set(pagesCacheKey, pages, 60 * 1);
//             console.log("pages", pages);
//             proxy.emit("pages", pages);
//           })
//         );
//       }
//     })
//   );
//   // END 取分页数据
//   var tabName = renderHelper.tabName(tab);
//   proxy.all("topics", "tops", "no_reply_topics", "pages", function(
//     topics,
//     tops,
//     no_reply_topics,
//     pages
//   ) {
//     console.log("all done");
//     res.render("index", {
//       // topics: topics,
//       // current_page: page,
//       // list_topic_count: limit,
//       // tops: tops,
//       // no_reply_topics: no_reply_topics,
//       // pages: pages,
//       // tabs: config.tabs,
//       // tab: tab,
//       // pageTitle: tabName && tabName + "版块"
//       name: "name",
//       sex: "man",
//       content: "heheh da"
//     });
//   });
// };

exports.index = function(req, res, next) {
  res.render("index");
};
