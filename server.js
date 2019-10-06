require('./public/assets/js/helpers/showArticles');
const morgan = require('morgan');
const express = require('express');
const hbs = require('hbs');

const app = express();
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
port = process.env.PORT || 3000;

// Express HBS engine
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

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

app.listen(port, () => {
	console.log(`Escuchando en el puerto ${port}`);
});
