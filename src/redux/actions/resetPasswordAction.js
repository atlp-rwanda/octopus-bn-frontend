import axios from 'axios';
import {
    SET_NEW_PASSWORD_REQUEST,
    SET_NEW_PASSWORD_SUCCESS,
    SET_NEW_PASSWORD_FAILURE,
    CLOSE_MESSAGE
} from '../types/PasswordResetTypes';
import translate from '../../languages/translate'

export  const resetPasswordAction = (data, history) => async (dispatch) => {
	try {
        dispatch(resetPasswordRequest());
        const token = localStorage.getItem('token');
		await axios.put(`https://octopus-bn-backend.herokuapp.com/api/v1/auth/reset-password/${token}`);
		dispatch(resetPasswordSuccess());
        // history.push('/password-reset-process');
	} catch (err) {
		if(err.response){
			const serverError = await err.response.data.error;
			dispatch(resetPasswordFailure(serverError));
		} else {
			dispatch(resetPasswordFailure(`${translate('network-error')}`));
		}
	}
};

 export const resetPasswordRequest = () => {
	return {
		type: SET_NEW_PASSWORD_REQUEST
	};
};

export const resetPasswordSuccess = (newlySetPassword) => {
	return {
		type: SET_NEW_PASSWORD_SUCCESS,
		newlySetPassword
	};
};

 export const resetPasswordFailure = (error) => {
	return {
		type: SET_NEW_PASSWORD_FAILURE,
		error
	};
};

 export const closeMessage = () => {
	return {
		type: CLOSE_MESSAGE
	};
};