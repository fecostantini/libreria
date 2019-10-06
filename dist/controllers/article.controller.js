"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArticles = getArticles;

var _Article = _interopRequireDefault(require("../models/Article"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getArticles() {
  let articulo = await _Article.default.findOne({
    where: {
      price: 900
    }
  });
  console.log("Articulo: ".concat(articulo));
}