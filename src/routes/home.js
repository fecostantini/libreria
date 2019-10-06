import { Router } from 'express';
import Article from '../models/Article';

const router = Router();

async function showHomePage(req, res) {
	let articles = await Article.findAll().map(article =>
		article.get({ plain: true })
	);

	res.render('home', { articles: articles });
}

router.get('/', showHomePage);

export default router;
