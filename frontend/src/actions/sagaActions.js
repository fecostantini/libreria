import { FETCH_SAGAS, CREATE_SAGA, UPDATE_LAST_REQUEST_STATUS } from './types';
import axios from 'axios';

const URL = 'http://localhost:3210/saga';

export const fetchSagas = async dispatch => {
	const resp = await axios.get(URL);
	const sagas = resp.data ? resp.data.sagas : null;

	if (sagas)
		dispatch({
			type: FETCH_SAGAS,
			payload: { sagas }
		});

	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};

export const createSaga = async (dispatch, nuevaSaga) => {
	const resp = await axios.post(URL, nuevaSaga);
	console.log(resp);
	const sagaCreada = resp.data ? resp.data.saga : null;

	if (sagaCreada)
		dispatch({
			type: CREATE_SAGA,
			payload: { sagaCreada }
		});

	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};
