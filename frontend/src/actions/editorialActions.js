import { FETCH_EDITORIALES, CREATE_EDITORIAL, UPDATE_LAST_REQUEST_STATUS } from './types';
import axios from 'axios';

const URL = 'http://localhost:3210/editorial';

export const fetchEditoriales = async dispatch => {
	const resp = await axios.get(URL);
	const editoriales = resp.data ? resp.data.editoriales : null;

	if (editoriales)
		dispatch({
			type: FETCH_EDITORIALES,
			payload: { editoriales }
		});

	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};

export const createEditorial = async (dispatch, nuevaEditorial) => {
	const resp = await axios.post(URL, nuevaEditorial);
	const editorialCreada = resp.data ? resp.data.editorial : null;

	if (editorialCreada)
		dispatch({
			type: CREATE_EDITORIAL,
			payload: { editorialCreada }
		});

	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};
