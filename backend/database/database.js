/* const Sequelize = require('sequelize');

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
*/

const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'libreria',
  password: 'admin',
  port: 5432,
})
pool.query("select * from autor;", (err, res) => {
  console.log(err, res)
  pool.end()
})
