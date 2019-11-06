import { FETCH_AUTORES, POST_AUTORES } from './types';
import axios from 'axios';

export const fetchAutores = () => dispatch => {
	console.log('fetcheando..');
	var url = 'http://localhost:3210/Autor';
	axios.get(url).then(resp => {
		console.log(resp.data);
		dispatch({
			type: FETCH_AUTORES,
			payload: resp.data
		});
	});
};

/*
export function fetchAutores() {
	return function(dispatch) {
		var url = 'http://localhost:3210/Libro';
		axios.get(url).then(resp => {
			console.log(resp.data);
			dispatch({
				type: FETCH_AUTORES,
				payload: resp.data
			});
		});
	};
}
*/
