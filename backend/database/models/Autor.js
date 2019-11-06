const pool = require('../database');

const querys = {
	GET_ALL: 'select * from autor;'
};

let getAutores = async () => {
	let response = await pool.query(querys.GET_ALL);
	let autores = response.rows;
	return autores;
};

module.exports = { getAutores };
