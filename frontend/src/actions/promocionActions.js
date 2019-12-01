import { FETCH_PROMOCIONES, UPDATE_LAST_REQUEST_STATUS } from './types';
import axios from 'axios';

const URL = 'http://localhost:3210/promocion';

export const fetchPromociones = async dispatch => {
	const resp = await axios.get(URL);
	const promociones = resp.data ? resp.data.promociones : null;

	if (promociones)
		dispatch({
			type: FETCH_PROMOCIONES,
			payload: { promociones }
		});

	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};
