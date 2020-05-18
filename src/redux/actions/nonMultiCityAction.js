import axios from 'axios';
import {
NEW_TRIP_REQUEST,
NEW_TRIP_REQUEST_SUCCESS,
NEW_TRIP_REQUEST_FAILURE,
CLOSE_MESSAGE
} from '../types/newTripTypes'

export const nonMultiCityAction = (data, history) => async (dispatch) => {
	try {
		dispatch(createRequest());
		const token = localStorage.getItem('bn-token');
		const header = {
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': `${token}`
			}
		};
		const res = await axios.post('https://octopus-bn-backend.herokuapp.com​/api/v1/trips/request', data, header);
		dispatch(createRequestSuccess(res));
		history.push('/requests');
	} catch (err) {
		if (err.response) {
			const errorMessage = await err.response.data.error;
			dispatch(createRequestFailure(errorMessage));
		} else {
			dispatch(createRequestFailure('Network Error'));
		}
	}
};

export const createRequest = () => {
	return {
		type: NEW_TRIP_REQUEST
	};
};

export const createRequestSuccess = (newTripResult) => {
	return {
		type: NEW_TRIP_REQUEST_SUCCESS,
		newTripResult
	};
};
export const createRequestFailure = (error) => {
	return {
		type: NEW_TRIP_REQUEST_FAILURE,
		error
	};
};

export const closeMessage = () =>{
	return {
		type: CLOSE_MESSAGE
	}
}
