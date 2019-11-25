import { UPDATE_LAST_REQUEST_STATUS } from '../actions/types';

const initialState = {
	status: ''
};

export default function(state = initialState, action) {
	if (action.type === UPDATE_LAST_REQUEST_STATUS) {
		return {
			...state,
			status: action.payload.status
		};
	} else return state;
}
