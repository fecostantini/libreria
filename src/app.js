import { showArticles } from '../public/assets/js/helpers/showArticles';
import homeRoutes from './routes/home';

const morgan = require('morgan');
const express = require('express');
const hbs = require('hbs');

const PROJECT_PATH = require('path').resolve(__dirname, '..');

const app = express();
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(homeRoutes);
// Express HBS engine
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
export default app;
