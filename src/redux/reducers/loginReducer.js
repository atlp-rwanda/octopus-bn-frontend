import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, CLOSE_MESSAGE } from '../types/loginTypes';

const initialState = {
	loading: 'none',
	user: [],
	error: '',
	open: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_USER_REQUEST:
			return {
				...state,
				loading: 'block',
				open: false
			};
		case LOGIN_USER_SUCCESS:
			return {
				loading: 'none',
				user: action.payload,
				error: '',
				open: false
			};
		case LOGIN_USER_FAILURE:
			return {
				loading: 'none',
				user: [],
				error: action.payload,
				open: true
			};
		case CLOSE_MESSAGE:
			return {
				loading: 'none',
				user: [],
				error: '',
				open: false
			};
		default:
			return state;
	}
};

export default reducer;
