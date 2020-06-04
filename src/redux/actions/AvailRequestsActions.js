import axios from 'axios';
import { GET_REQUESTS_FAILURE, GET_REQUESTS_SUCCESS, GET_REQUESTS } from '../types/requestsTypes';

export const getRequestsAction = (data, history) => async (dispatch) => {
	try {
		dispatch(getRequests());
		const token = localStorage.getItem('bn-token');
		const header = {
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': `${token}`
			}
		};
		const res = await axios.get(`https://octopus-bn-backend.herokuapp.com​/api/v1/trips/avail-requests`, header);
		dispatch(getRequestsSuccess(res));
	} catch (err) {
		if (err.response) {
			const errorMessage = await err.response.data.error;
			dispatch(getRequestsFailure(errorMessage));
		} else {
			dispatch(getRequestsFailure('Network Error'));
		}
	}
};

export const getRequests = () => {
	return {
		type: GET_REQUESTS
	};
};

export const getRequestsSuccess = (user) => {
	return {
		type: GET_REQUESTS_SUCCESS,
		payload: user
	};
};
export const getRequestsFailure = (error) => {
	return {
		type: GET_REQUESTS_FAILURE,
		payload: error
	};
};
