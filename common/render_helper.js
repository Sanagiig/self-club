/*!
 * nodeclub - common/render_helpers.js
 * Copyright(c) 2013 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var MarkdownIt = require("markdown-it");
var _ = require("lodash");
var config = require("../config.default");
var validator = require("validator");
var jsxss = require("xss");
var multiline = require("multiline");

exports.tabName = function(tab) {
  var pair = _.find(config.tabs, function(pair) {
    return pair[0] === tab;
  });
  if (pair) {
    return pair[1];
  }
};
