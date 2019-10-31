const db = require('../database');

const Autor = db.sequelize.define(
	'autor',
	{
		id_autor: { type: db.Sequelize.INTEGER, allowNull: false, primaryKey: true },
		nombre: { type: db.Sequelize.STRING, allowNull: false },
		apellido: { type: db.Sequelize.STRING, allowNull: false },
		nacionalidad: { type: db.Sequelize.STRING },
	},
	{ timestamps: false, freezeTableName: true }
);

module.exports = { Autor };