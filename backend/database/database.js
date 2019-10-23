const Sequelize = require('sequelize');

const CONNECTION_URL = 'postgres://postgres:admin@localhost:5432/libreria';
const sequelize = new Sequelize(CONNECTION_URL);

sequelize
	.authenticate()
	.then(() => {
		console.log('Conectado con exito a POSGRESQL');
	})
	.catch(err => {
		console.error('Error al conectarse a POSGRESQL:', err);
	});

module.exports = { sequelize, Sequelize };
