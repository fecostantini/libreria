const db = require('../database');

const Libro = db.sequelize.define(
	'libro',
	{
		isbn: { type: db.Sequelize.INTEGER, allowNull: false, primaryKey: true },
		titulo: { type: db.Sequelize.STRING, allowNull: false },
		idioma: { type: db.Sequelize.STRING, allowNull: false },
		edicion: { type: db.Sequelize.STRING },
		descripcion: { type: db.Sequelize.STRING },
		stock_libro: { type: db.Sequelize.INTEGER, allowNull: false }
	},
	{ timestamps: false, freezeTableName: true }
);

module.exports = { Libro };
