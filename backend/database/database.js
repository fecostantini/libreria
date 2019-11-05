const { Pool } = require('pg');

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'libreria',
	password: 'admin',
	port: 5432
});

pool.query('select * from autor;', (err, res) => {
	const autores = res.rows;
	autores.forEach(autor => {
		console.log(`${autor.autor}`);
	});
	pool.end();
});
