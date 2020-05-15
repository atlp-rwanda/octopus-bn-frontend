import { RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE, CLOSE_MESSAGE } from '../types/resetPasswordTypes';

const initialState = {
	loading: 'none',
	error: '',
	open: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case RESET_PASSWORD_REQUEST:
			return {
				...state,
				loading: 'block',
				open: false
			};
		case RESET_PASSWORD_SUCCESS:
			return {
				loading: 'none',
				error: '',
				open: false
			};
		case RESET_PASSWORD_FAILURE:
			return {
				loading: 'none',
				error: action.payload,
				open: true
			};
		case CLOSE_MESSAGE:
			return {
				loading: 'none',
				error: '',
				open: false
			};
		default:
			return state;
	}
};

export default reducer;
