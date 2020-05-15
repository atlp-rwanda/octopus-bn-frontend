import axios from 'axios';
import {
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAILURE,
	CLOSE_MESSAGE
} from '../types/resetPasswordTypes';
import queryString from 'query-string';

export const restEmailAction = (data, history) => async (dispatch) => {
	try {
		dispatch(resetEmailRequest());
		const res = await axios.post(`https://octopus-bn-backend.herokuapp.com/api/v1/auth/forgot-password`, data);
		dispatch(resetEmailSuccess());
		history.push({ pathname: '/message', state: { message: 'password_reset_email' } });
	} catch (err) {
		if (err.response) {
			const errorMessage = await err.response.data.error;
			dispatch(resetEmailFailure(errorMessage));
		} else {
			dispatch(resetEmailFailure('Network Error'));
		}
	}
};

export const restPasswordAction = (data, token, history) => async (dispatch) => {
	try {
		dispatch(resetEmailRequest());
		const res = await axios.put(
			`https://octopus-bn-backend.herokuapp.com/api/v1/auth/reset-password/${token}`,
			data
		);
		dispatch(resetEmailSuccess());
		history.push({ pathname: '/message', state: { message: 'password_reset', next: '/', label: 'sign-in-click' } });
	} catch (err) {
		if (err.response) {
			const errorMessage = await err.response.data.error;
			dispatch(resetEmailFailure(errorMessage));
		} else {
			dispatch(resetEmailFailure('Network Error'));
		}
	}
};

export const resetEmailRequest = () => {
	return {
		type: RESET_PASSWORD_REQUEST
	};
};

export const resetEmailSuccess = (user) => {
	return {
		type: RESET_PASSWORD_SUCCESS
	};
};
export const resetEmailFailure = (error) => {
	return {
		type: RESET_PASSWORD_FAILURE,
		payload: error
	};
};

export const closeMessage = () => {
	return {
		type: CLOSE_MESSAGE
	};
};
