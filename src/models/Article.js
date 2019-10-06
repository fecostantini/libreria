import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const Article = sequelize.define(
	'article',
	{
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
	},
	{ timestamps: false, freezeTableName: true }
);

export default Article;
