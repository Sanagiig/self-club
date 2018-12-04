var userModel = require("../../models").User;
var utility = require("utility");
var checkUser = function(req, res, next) {
  var loginname = req.body.loginname;
  var email = req.body.email;
  var result = {
    data: [],
    msg: "",
    code: "0",
    status: "success"
  };

  userModel.findOne({ $or: [{ loginname }, { email }] }, function(err, data) {
    if (err) {
      result = {
        data: [],
        msg: "查询数据库失败",
        status: "error",
        code: "0"
      };
    } else {
      // 判断有无数据
      if (data) {
        if (data.loginname === loginname) {
          result.msg = "用户名已被注册";
        } else if (data.email === email) {
          result.msg = "email已被使用";
        }
      }
    }

    res.json(result);
  });
};

var register = function(req, res, next) {
  var loginname = req.body.loginname;
  var pass = req.body.pass;
  var email = req.body.email;
  var result = {
    status: "success",
    code: "0",
    data: [],
    msg: "注册成功"
  };
  if (!loginname || !pass || !email) {
    result.status = "failure";
    result.msg = "请将账号信息补全";
    res.json(result);
  } else {
    pass = utility.md5(pass);
    userModel.create(
      {
        loginname,
        pass,
        email
      },
      function(err, data) {
        if (err) {
          result.status = "error";
          result.msg = "注册失败";
        } else {
          res.json(result);
        }
      }
    );
  }
};

var login = function(req, res, next) {
  var loginname = req.body.loginname;
  var pass = utility.md5(req.body.pass);
  var result = {
    code: "0",
    status: "success",
    msg: "登录成功",
    data: []
  };

  userModel.findOne({ loginname, pass }, function(error, data) {
    console.log(data);
    if (error) {
      result.status = "error";
      result.msg = "登录时发生未知异常，请稍后再试";
    } else {
      if (!data) {
        result.status = "failure";
        result.msg = "登录失败，账号或密码错误";
      } else {
        delete data.pass;
        result.data = data;
        req.session.isLogin = true;
      }
    }

    res.json(result);
  });
};

module.exports = {
  checkUser,
  register,
  login
};
