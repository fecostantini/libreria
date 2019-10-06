"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Article = _database.sequelize.define('article', {
  id: {
    type: _sequelize.default.INTEGER,
    primaryKey: true
  },
  price: {
    type: _sequelize.default.REAL
  },
  description: {
    type: _sequelize.default.TEXT
  },
  image: {
    type: _sequelize.default.TEXT
  }
}, {
  timestamps: false,
  freezeTableName: true
});

var _default = Article;
exports.default = _default;