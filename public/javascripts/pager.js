define(["jquery"], function($) {
  "use strict";
  $.fn.pager = (function($) {
    var $this = "";
    var _config = {};

    function init(config) {
      _config = {
        curPage: 1,
        pageSize: 10,
        totalCount: 0,
        pageGup: 2, // 离当前页数有多少个数据
        cb: null
      };

      $this.data("config", _config);
      if (config.cb) {
        $this.unbind("click");
        $this.bind("click", function(e) {
          var $li = $(e.target);
          var conf = {};
          console.log($li.hasClass("pager-item"));
          //进行翻页
          if ($li.hasClass("pager-item")) {
            //判断最左 ，最右
            if ($li.hasClass("pager-arrow-item")) {
              if ($li.hasClass("left-arrow")) {
                conf.curPage = 1;
              } else if ($li.hasClass("right-arrow")) {
                conf.curPage = Math.ceil(
                  parseInt(_config.totalCount / _config.pageSize)
                );
              }

              //数字跳转
            } else if ($li.hasClass("pager-num-item")) {
              conf = { curPage: parseInt($li.html()) };
            }

            console.log("conf", conf);
            set(conf);
            _config.cb(_config);
          }

          console.log("e", e, e.target.innerHTML);
        });
      }
    }

    function set(config) {
      for (var k in config) {
        if (_config[k] !== undefined) {
          _config[k] = config[k];
        } else {
          console.warn("pages's arg ", k, "is undefined !");
        }
      }
      console.log("_config", _config);
      buildHtml();
    }

    function buildHtml() {
      if (_config.totalCount) {
        $this.html("");
        var pageGup = _config.pageGup;
        var totalPage = _config.totalCount / _config.pageSize;
        var hasLeftArrow = _config.curPage - 1 > pageGup;
        var hasRightArrow = totalPage - _config.curPage > pageGup;
        var hasLeftDot = _config.curPage - 1 > pageGup;
        var hasRightDot = totalPage - _config.curPage > pageGup;
        var $fragment = $(document.createDocumentFragment());

        // 添加HTML & 样式
        $this.addClass("pager-bar");
        if (hasLeftArrow) {
          $fragment.append(
            '<li class="pager-item pager-arrow-item left-arrow">《</li>'
          );
        }

        if (hasLeftDot) {
          $fragment.append('<li class="pager-item pager-dot-item">...</li>');
        }

        var start, end;
        //判断数字的起始和结束
        if (_config.curPage < totalPage - pageGup) {
          start = _config.curPage - pageGup > 0 ? _config.curPage - pageGup : 1;
          end = hasLeftDot ? _config.curPage + pageGup : pageGup * 2 + 1;
        } else {
          start = totalPage - 2 * pageGup;
          end = totalPage;
        }

        while (start <= end) {
          if (start === _config.curPage) {
            $fragment.append(
              '<li class="pager-item pager-num-item active">' +
                start++ +
                "</li>"
            );
          } else {
            $fragment.append(
              '<li class="pager-item pager-num-item">' + start++ + "</li>"
            );
          }
        }

        if (hasRightDot) {
          $fragment.append('<li class="pager-item pager-dot-item">...</li>');
        }

        if (hasRightArrow) {
          $fragment.append(
            '<li class="pager-item pager-arrow-item right-arrow">》</li>'
          );
        }

        $this.append($fragment);
      }
    }

    var main = function(cmd, arg) {
      cmd = cmd ? cmd.trim() : "";

      $this = this;
      _config = this.data("data");

      if (cmd === "init") {
        this.data("config", {});
        init(arg);
        set(arg);
      } else if (cmd === "set") {
        set(this, arg);
      } else {
        console.warn("pager: cmd error");
      }
    };

    return main;
  })($);

  return "pager";
});
