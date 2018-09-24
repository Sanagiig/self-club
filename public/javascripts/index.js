require.config({
  //默认情况下从这个文件开始拉去取资源
  baseUrl: "public",
  //如果你的依赖模块以pb头，会从scripts/pb加载模块。
  paths: {
    jquery: ["libs/jquery-2.1.0"],
    pager: "javascripts/pager"
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
  console.log(
    "pager",
    $("#pager").pager("init", {
      curPage: 3,
      pageSize: 10,
      totalCount: 10000,
      pageGup: 3,
      cb: function(c) {
        console.log(c);
      }
    })
  );
});
console.log("index");
