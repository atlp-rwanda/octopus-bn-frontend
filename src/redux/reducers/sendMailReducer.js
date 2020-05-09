import {
    SEND_EMAIL_FAILURE,
    SEND_EMAIL_REQUEST,
    SEND_EMAIL_SUCCESS,
    CLOSE_MESSAGE
} from '../types/PasswordResetTypes';


const initialState = {
	loading: 'none',
	email: '',
	error: '',
	open: false
};

const sendMailReducer = (state = initialState, action) => {
	switch (action.type) {
		case SEND_EMAIL_REQUEST:
			return {
				...state,
				loading: 'block',
				open: false
			};
		case SEND_EMAIL_SUCCESS:
			return {
				loading: 'none',
				email: action.email,
				error: '',
				open: false
			};
		case SEND_EMAIL_FAILURE:
			return {
				loading: 'none',
				email: '',
				error: action.error,
				open: true
			};
		case CLOSE_MESSAGE:
			return {
				loading: 'none',
				email: '',
				error: '',
				open: false
			};
		default:
			return state;
	}
};

export default sendMailReducer;