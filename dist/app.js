"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _showArticles = require("../public/assets/js/helpers/showArticles");

var _home = _interopRequireDefault(require("./routes/home"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const morgan = require('morgan');

const express = require('express');

const hbs = require('hbs');

const PROJECT_PATH = require('path').resolve(__dirname, '..');

const app = express();
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(_home.default); // Express HBS engine

app.set('view engine', 'hbs');
hbs.registerPartials(PROJECT_PATH + '/views/partials');
/*
app.get('/', (req, res) => {
	res.render('home', {
		articles: [
			{
				image: 'assets/images/articles/article1.png',
				price: 1000,
				description: 'Descripción del artículo.'
			},
			{
				image: 'assets/images/articles/article1.png',
				price: 1000,
				description: 'Descripción del artículo.'
			},
			{
				image: 'assets/images/articles/article1.png',
				price: 1000,
				description: 'Descripción del artículo.'
			},
			{
				image: 'assets/images/articles/article1.png',
				price: 1000,
				description: 'Descripción del artículo.'
			},
			{
				image: 'assets/images/articles/article1.png',
				price: 1000,
				description: 'Descripción del artículo.'
			},
			{
				image: 'assets/images/articles/article1.png',
				price: 1000,
				description: 'Descripción del artículo.'
			},
			{
				image: 'assets/images/articles/article1.png',
				price: 1000,
				description: 'Descripción del artículo.'
			},
			{
				image: 'assets/images/articles/article1.png',
				price: 1000,
				description: 'Descripción del artículo.'
			}
		]
	});
});

app.get('/admin', (req, res) => {
	res.render('posible-vista-admin', {
		data: 'dato1',
		tuvieja: ['alto', 'array', 'amigo']
	});
});
*/

var _default = app;
exports.default = _default;