import axios from 'axios';
import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, CLOSE_MESSAGE } from '../types/loginTypes';
export const loginAction = (data, history) => async (dispatch) => {
	try {
		dispatch(loginUserRequest());
		const res = await axios.post(`https://octopus-bn-backend.herokuapp.com/api/v1/auth/signin`, data);
		const user = await res.data;
		localStorage.setItem('bn-token', user.token);
		localStorage.setItem('bn-user-data', JSON.stringify(user.data));
		dispatch(loginUserSuccess({ data: user.data, token: user.token }));
		history.push('/dashboard');
	} catch (err) {
		if (err.response) {
			const errorMessage = await err.response.data.error;
			dispatch(loginUserFailure(errorMessage));
		} else {
			dispatch(loginUserFailure('Network Error'));
		}
	}
};

export const loginUserRequest = () => {
	return {
		type: LOGIN_USER_REQUEST
	};
};

export const loginUserSuccess = (user) => {
	return {
		type: LOGIN_USER_SUCCESS,
		payload: user
	};
};
export const loginUserFailure = (error) => {
	return {
		type: LOGIN_USER_FAILURE,
		payload: error
	};
};

export const closeMessage = () => {
	return {
		type: CLOSE_MESSAGE
	};
};
