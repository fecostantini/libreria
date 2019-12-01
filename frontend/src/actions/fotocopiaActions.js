import { FETCH_FOTOCOPIAS, UPDATE_LAST_REQUEST_STATUS } from './types';
import axios from 'axios';
const URL = 'http://localhost:3210/fotocopia';

export const fetchFotocopias = async dispatch => {
	const resp = await axios.get(URL);
	const fotocopias = resp.data ? resp.data.fotocopias : null;

	if (fotocopias)
		dispatch({
			type: FETCH_FOTOCOPIAS,
			payload: { fotocopias }
		});

	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};
