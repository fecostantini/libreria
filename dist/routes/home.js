"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _Article = _interopRequireDefault(require("../models/Article"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();

async function showHomePage(req, res) {
  let articles = await _Article.default.findAll().map(article => article.get({
    plain: true
  }));
  res.render('home', {
    articles: articles
  });
}

router.get('/', showHomePage);
var _default = router;
exports.default = _default;