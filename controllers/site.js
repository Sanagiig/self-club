module.exports = {
  index: function(req, res, next) {
    res.render("index");
  },
  login: function(req, res, next) {
    res.render("login");
  },
  register: function(req, res, next) {
    res.render("register");
  }
};
