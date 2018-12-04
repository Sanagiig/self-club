define(["jquery"], function($) {
  "use strict";
  $.fn.pager = (function($) {
    var $this;
    var _config;

    function init(config, silent) {
      _config = {
        curPage: 1,
        pageSize: 10,
        totalCount: 0,
        pageGup: 2, // 离当前页数有多少个数据
        cb: null
      };

      // 事件监听
      if (config.cb) {
        $this.unbind("click");
        $this.bind("click", function(e) {
          var $li = $(e.target);
          var conf = {};
          //进行翻页
          try {
            if ($li.hasClass("pager-item")) {
              //判断最左 ，最右
              if ($li.hasClass("pager-arrow-item")) {
                if ($li.hasClass("left-arrow")) {
                  conf.curPage = 1;
                } else if ($li.hasClass("right-arrow")) {
                  conf.curPage = Math.ceil(
                    Math.ceil(_config.totalCount / _config.pageSize)
                  );
                }

                //数字跳转
              } else if ($li.hasClass("pager-num-item")) {
                conf = { curPage: parseInt($li.html()) };
              }

              set(conf);
            }
          } catch (e) {
            console.error("pager 组件无配置 \n", e);
          }
        });
      }

      set(config, silent);
    }

    function set(config, silent) {
      for (var k in config) {
        if (_config[k] !== undefined) {
          _config[k] = config[k];
        } else {
          console.warn("pager's config ", k, "is undefined !");
        }
      }
      buildHtml();
      if (!silent && _config.cb instanceof Function) {
        _config.cb(_config);
      }
    }

    function buildHtml() {
      if (_config.totalCount) {
        $this.html("");
        var curPage = parseInt(_config.curPage);
        var pageGup = parseInt(_config.pageGup);
        var totalPage = (_config.totalPage = Math.ceil(
          _config.totalCount / _config.pageSize
        ));

        var hasLeftDot = curPage - pageGup > 1;
        var hasRightDot = totalPage - pageGup > curPage;

        var hasLeftArrow = hasLeftDot;
        var hasRightArrow = hasRightDot;

        var $fragment = $(document.createDocumentFragment());
        console.log("tp", totalPage);
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
        // page 总数过小
        if (totalPage < pageGup) {
          start = 1;
          end = totalPage;
        } else {
          start = hasLeftArrow ? curPage - pageGup : 1;
          end = hasRightArrow ? curPage + pageGup : totalPage;
        }
        console.log("tot ", totalPage, end, curPage, pageGup);

        while (start <= end) {
          if (start == curPage) {
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

      console.log("_config", _config);
      // 获取配置
      if (!this.data("config") && cmd != "init") {
        console.warn("initial the pager first !");
        return;
      }

      if (cmd === "init") {
        _config = {};
        this.data("config", _config);
        init(arg);
      } else if (cmd === "set") {
        set(arg);
      } else if (cmd === "silentSet") {
        set(arg, true);
      } else {
        console.warn("pager: cmd error");
      }
    };

    return main;
  })($);

  return "pager";
});
