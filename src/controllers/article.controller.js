import Article from '../models/Article';

export async function getArticles() {
	let articulo = await Article.findOne({ where: { price: 900 } });
	console.log(`Articulo: ${articulo}`);
}
