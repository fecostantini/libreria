import {
	FETCH_AUTORES,
	CREATE_AUTOR,
	DELETE_AUTOR,
	UPDATE_AUTOR
} from './types';
import axios from 'axios';

const URL = 'http://localhost:3210/autor';

export const fetchAutores = () => dispatch => {
	console.log('action fetchAutores..');
	axios.get(URL).then(resp => {
		const autoresTraidosConExito = resp.data.status === 'EXITO';
		if (autoresTraidosConExito) {
			const autores = resp.data.autores;
			dispatch({
				type: FETCH_AUTORES,
				payload: autores
			});
		}
	});
};

export const createAutor = nuevoAutor => dispatch => {
	axios.post(URL, nuevoAutor).then(resp => {
		const autorCreado = resp.data.status === 'EXITO';
		if (autorCreado) {
			dispatch({
				type: CREATE_AUTOR,
				payload: resp.data.autor
			});
		}
	});
};

export const deleteAutor = idAutorABorrar => dispatch => {
	const autorABorrar = { id_autor: idAutorABorrar };
	axios.delete(URL, { data: autorABorrar }).then(resp => {
		const autorBorrado = resp.data.status === 'EXITO';
		console.log(resp.data.status);
		if (autorBorrado) {
			dispatch({
				type: DELETE_AUTOR,
				payload: { idBorrado: idAutorABorrar }
			});
		}
	});
};

export const updateAutor = autorActualizado => dispatch => {
	axios.put(URL, autorActualizado).then(resp => {
		const autorActualizado = resp.data.status === 'EXITO';

		if (autorActualizado) {
			dispatch({
				type: UPDATE_AUTOR,
				payload: autorActualizado
			});
		}
	});
};

