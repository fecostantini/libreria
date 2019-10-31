const db = require('../database');

const Categoria = db.sequelize.define(
	'categoria',
	{
		id_categoria: { type: db.Sequelize.INTEGER, allowNull: false, primaryKey: true },
		nombre_categoria: { type: db.Sequelize.STRING, allowNull: false },
	},
	{ timestamps: false, freezeTableName: true }
);


module.exports = { Categoria };