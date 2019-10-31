import Usuario from './Usuario'
const db = require('../database');

const Carrito = db.sequelize.define(
	'carrito',
	{
		id_carrito: { type: db.Sequelize.INTEGER, allowNull: false, primaryKey: true },
	},
	{ timestamps: false, freezeTableName: true }
);
Carrito.belongsTo(Usuario)


module.exports = { Carrito };