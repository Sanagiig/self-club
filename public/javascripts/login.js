require.config({
  //默认情况下从这个文件开始拉去取资源
  baseUrl: "public",
  //如果你的依赖模块以pb头，会从scripts/pb加载模块。
  paths: {
    jquery: ["libs/jquery-2.1.0"]
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

require(["jquery"], function($) {
  var loginname, pass;
  // 事件监听
  $("#loginBtn").click(function(event) {
    var url = "/api/v1/login";
    var params;
    loginname = $("#userInput").val();
    pass = $("#passInput").val();
    params = {
      loginname: loginname,
      pass: pass
    };

    $.post(url, params, function(res) {
      if (res.status === "success") {
        // 保存用户信息
        if (res.data instanceof Object) {
          localStorage.setItem("clubCurInfo", JSON.stringify(res.data));
        }
        window.location.href = "/";
      } else {
        alert(res.msg);
      }
    });
  });

  $("#registerBtn").click(function(event) {
    window.location.href = "/register";
  });
});
