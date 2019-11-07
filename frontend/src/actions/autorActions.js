import { FETCH_AUTORES, CREATE_AUTOR } from './types';
import axios from 'axios';

const URL = 'http://localhost:3210/autor';

export const fetchAutores = () => dispatch => {
	console.log('action fetchAutores..');
	axios.get(URL).then(resp => {
		console.log(resp.data);
		dispatch({
			type: FETCH_AUTORES,
			payload: resp.data
		});
	});
};

export const createAutor = nuevoAutor => dispatch => {
	console.log('action createAutor..');
	axios.post(URL, nuevoAutor).then(resp => {
		const autorCreado = resp.data;
		console.log(autorCreado);

		if (autorCreado) {
			dispatch({
				type: CREATE_AUTOR,
				payload: resp.data
			});
		}
	});
};

//TODO: updateAutor, deleteAutor
