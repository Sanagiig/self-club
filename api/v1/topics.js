var model = require("../../models/index");
var topicModel = model.Topic;

var getTopicListByQuery = function(req, res, next) {
  var pageInfo = req.body.pageInfo || {};
  var params = req.body.params || {};
  var pageSize = pageInfo.pageSize || 15;
  var curPage = pageInfo.curPage >= 1 ? pageInfo.curPage : 1;

  params.deleted = false;
  topicModel.count(params, function(err, count) {
    topicModel
      .find(
        params,
        "title author_id top good lock reply_count visit_count collect_count create_at update_at last_reply last_reply_at content_is_html tab"
      )
      .limit(pageSize)
      .skip((curPage - 1) * pageSize)
      .sort({ top: -1, good: -1, lock: -1, last_reply_at: -1 })
      .exec(function(err, doc) {
        if (err) {
          res.json({
            status: "error",
            code: "0",
            msg: "查询数据库失败",
            data: {}
          });
        } else {
          res.json({
            status: "success",
            code: "0",
            msg: "查询数据成功",
            data: {
              pageInfo: {
                pageSize,
                curPage,
                totalCount: count
              },
              data: doc
            },
            receive: req.body
          });
        }
      });
  });
};

exports.getTopicListByQuery = getTopicListByQuery;
