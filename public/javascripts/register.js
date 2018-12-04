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
  console.log($("#userInput"));
  var loginname = $("#userInput").val();
  var pass = $("#passInput").val();
  var checkPass = $("#passCheck").val();
  var email = $("#email").val();

  var handleCheckUser = function() {
    var url = "/api/v1/checkUser";
    var params;
    var msg = "";

    loginname = $("#userInput").val();
    pass = $("#passInput").val();
    checkPass = $("#passCheck").val();
    email = $("#email").val();

    params = {
      loginname: loginname,
      pass: pass,
      email: email
    };
    emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

    //  必填校验
    if (!loginname) {
      msg = "请输入用户名";
    } else if (!pass || !checkPass) {
      msg = "请输入密码";
    } else if (!email) {
      msg = "请输入邮箱";
    }

    // 合法字符校验
    if (!msg) {
      if (!emailReg.test(email)) {
        msg = "请输入合法的邮箱";
      } else if (pass !== checkPass) {
        msg = "两次输入的密码不一致，请重新输入";
      }
    }

    // 提交数据
    if (msg) {
      alert(msg);
    } else {
      $.post(url, params, function(res) {
        if (res.msg) {
          alert(res.msg);
        } else {
          handleRegister();
        }
      });
    }
  };

  var handleRegister = function(event) {
    var url = "/api/v1/register";
    var params = {
      loginname: loginname,
      pass: pass,
      email: email
    };

    $.post(url, params, function(res) {
      alert(res.msg);
      if (res.status === "success") {
        window.location.href = "/";
      }
    });
  };

  var handleCancel = function(event) {
    window.location.href = "/";
  };

  // 事件监听
  $("#registerBtn").click(handleCheckUser);
  $("#cancelBtn").click(handleCancel);
});
