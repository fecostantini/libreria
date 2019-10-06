"use strict";

const Sequelize = require('sequelize');

require('../database/database');

const Article = sequelize.define('article', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  price: {
    type: Sequelize.REAL
  },
  description: {
    type: Sequelize.TEXT
  },
  image: {
    type: Sequelize.TEXT
  }
}, {
  timestamps: false
});
module.exports = {
  Article
};