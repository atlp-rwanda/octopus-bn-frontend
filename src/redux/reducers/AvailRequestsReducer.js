import { GET_REQUESTS_FAILURE, GET_REQUESTS_SUCCESS, GET_REQUESTS } from '../types/requestsTypes';

const initialState = {
	loading: 'block',
	requests: [],
	error: '',
	open: false
};

const reducer = (state = initialState, {type, payload}) => {
	switch (type) {
		case GET_REQUESTS:
			return {
				...state,
				loading: 'block',
				open: false
			};
		case GET_REQUESTS_SUCCESS:
			return {
				loading: 'none',
				requests: payload,
				error: '',
				open: false
			};
		case GET_REQUESTS_FAILURE:
			return {
				loading: 'none',
				requests: [],
				error: payload,
				open: true
			};
		default:
			return state;
	}
};

export default reducer;
