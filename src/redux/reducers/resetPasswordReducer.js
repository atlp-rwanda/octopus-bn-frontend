import {
    SET_NEW_PASSWORD_REQUEST,
    SET_NEW_PASSWORD,
    SET_NEW_PASSWORD_SUCCESS,
    SET_NEW_PASSWORD_FAILURE,
    CLOSE_MESSAGE
} from '../types/PasswordResetTypes';


const initialState = {
	loading: 'none',
	newPassword: '',
	error: '',
	open: false
};

const resetPasswordReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_NEW_PASSWORD_REQUEST:
			return {
				...state,
				loading: 'block',
				open: false
			};
		case SET_NEW_PASSWORD_SUCCESS:
			return {
				loading: 'none',
				newPassword: action.newlySetPassword,
				error: '',
				open: false
			};
		case SET_NEW_PASSWORD_FAILURE:
			return {
				loading: 'none',
				newPassword: '',
				error: action.error,
				open: true
			};
		case CLOSE_MESSAGE:
			return {
				loading: 'none',
				newPassword: '',
				error: '',
				open: false
			};
		default:
			return state;
	}
};

export default resetPasswordReducer;