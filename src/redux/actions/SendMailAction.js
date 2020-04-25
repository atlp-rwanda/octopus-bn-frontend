import axios from 'axios';
import {
    SEND_EMAIL_REQUEST,
    SEND_EMAIL_SUCCESS,
    SEND_EMAIL_FAILURE,
    CLOSE_MESSAGE
} from '../types/PasswordResetTypes';
import translate from '../../languages/translate'

export  const sendMailAction = (data, history) => async (dispatch) => {
	try {
		dispatch(sendEmailRequest());
		const res = await axios.post('https://octopus-bn-backend.herokuapp.com/api/v1/auth/forgot-password', data);
        const email = await res.data;
		localStorage.setItem('token', res.data.token);
		dispatch(sendEmailSuccess(email));
        history.push('/password-reset-process');
	} catch (err) {
		if(err.response){
			const serverError = await err.response.data.error;
			dispatch(sendEmailFailure(serverError));
		} else {
			dispatch(sendEmailFailure(`${translate('network-error')}`));
		}
	}
};

 export const sendEmailRequest = () => {
	return {
		type: SEND_EMAIL_REQUEST
	};
};

export const sendEmailSuccess = (email) => {
	return {
		type: SEND_EMAIL_SUCCESS,
		email
	};
};

 export const sendEmailFailure = (error) => {
	return {
		type: SEND_EMAIL_FAILURE,
		error
	};
};

 export const closeMessage = () => {
	return {
		type: CLOSE_MESSAGE
	};
};
