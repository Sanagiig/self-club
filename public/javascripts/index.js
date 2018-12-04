require.config({
  //默认情况下从这个文件开始拉去取资源
  baseUrl: "public",
  //如果你的依赖模块以pb头，会从scripts/pb加载模块。
  paths: {
    jquery: ["libs/jquery-2.1.0"],
    pager: "javascripts/pager/pager"
  }
  // load backbone as a shim，所谓就是将没有采用requirejs方式定义
  //模块的东西转变为requirejs模块

  //   shim: {
  //     pager: {
  //       deps: ["jquery"],
  //       exports: "pager"
  //     }
  //   }
});
require(["jquery", "pager"], function($, pager) {
  window.remoteHost = "";
  var remoteHost = "";
  var pageInfo = {
    curPage: 1,
    pageSize: 10,
    totalCount: 100
  };
  var userInfo = localStorage.getItem("clubCurInfo");

  // 获取文章列表
  var requestTopicList = function(pageInfo, cb) {
    // 当post 当上参数的时候，会请求2次 ，wtf ??!!
    if (!pageInfo) return;

    var queryTopicListUrl = "/api/v1/queryTopicList";
    pageInfo = pageInfo instanceof Object ? pageInfo : {};

    $.post(queryTopicListUrl, { pageInfo: pageInfo }, function(res) {
      pageInfo = res.data.pageInfo;
      if (res.status !== "success") {
        return alert("获取文章列表失败 ~");
      } else {
        // 更改pageInfo
        console.log(res.data.pageInfo);
        $("#pager").pager("silentSet", res.data.pageInfo);

        if (cb instanceof Function) {
          cb(res.data.data);
        }
      }
    });
  };

  // 更新文章列表
  var updateTopicList = function(data) {
    var listDom = $("#topicList");
    var listItemTempDom = $("#listItemTemp");
    var tempCon = $(document.createDocumentFragment());
    var listItemDom;

    if (data.length) {
      listDom
        .find(".dom-template")
        .siblings(".list-item")
        .remove(); //ItemTempDom); //.remove();
    }

    for (var i = 0; i < data.length; i++) {
      var d = data[i];
      listItemDom = listItemTempDom.clone();
      listItemDom.removeAttr("id");
      listItemDom.removeClass("dom-template");
      listItemDom.find(".topic-title").html(d.title);
      listItemDom.find(".visit_count").html(d.visit_count);
      listItemDom.find(".reply-count").html(d.reply_count);

      // 文章状态
      if (d.top) {
        listItemDom.find(".topic-status").html("置顶");
      } else if (d.good) {
        listItemDom.find(".topic-status").html("精品");
      } else if (d.lock) {
        listItemDom.find(".topic-status").html("锁定");
      } else {
        listItemDom.find(".topic-status").remove();
      }

      tempCon.append(listItemDom);
    }
    listDom.append(tempCon);
  };

  /**
   *
   *  事件注册
   */
  // pager
  $("#pager").pager("init", {
    curPage: pageInfo.curPage,
    pageSize: pageInfo.pageSize,
    totalCount: pageInfo.totalCount,
    pageGup: 3,
    cb: function(pageInfo) {
      requestTopicList(pageInfo, updateTopicList);
    }
  });

  /**
   *
   * 初始化方法
   */
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    $("#linkToRegister").hide();
    $("#linkToLogin").hide();
  }
});
