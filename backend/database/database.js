const { Pool } = require('pg');

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'libreria',
	password: 'admin',
	port: 5432
});

let agregarAutor = (nombre, nacionalidad) => {
	pool.query(`INSERT INTO autor(\"autor\",\"nacionalidad\") VALUES(\'${nombre}\',\'${nacionalidad}\');`, (err, res) => {
		console.log(res)
	});
}

let getAutores = async () => {
	const response = await pool.query('select * from autor;');
	const autores = response.rows;
	return autores;
}

let updateAutor = async (id, nuevoAutor) => {
	//chequear campos vacios
	if (nuevo)
	//actualizar en base a eso
	const response = await pool.query('select * from autor;');
	const autores = response.rows;
	return autores;
}

// agregarAutor('jorge bucay', 'argentina')
getAutores().then(autores => {
	autores.forEach(autor => {console.log(autor);})
})

pool.end();
