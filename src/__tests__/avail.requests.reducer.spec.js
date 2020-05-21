import { GET_REQUESTS, GET_REQUESTS_SUCCESS, GET_REQUESTS_FAILURE } from '../redux/types/requestsTypes';
import { cleanup } from '@testing-library/react';
import reducer from '../redux/reducers/AvailRequestsReducer';
import { requestsMockData } from '../__mocks__/requestsMock';
describe('RESET PASSWORD REDUCER', () => {
	const initialState = {
		loading: 'block',
		requests: [],
		error: '',
		open: false
	};
	afterEach(cleanup);
	it('Should return an object with loading set true for start-up', () => {
		expect(reducer(initialState, { type: GET_REQUESTS })).toEqual({
			...initialState,
			loading: 'block'
		});
	});
	it('Should return an object with an error if something went wrong on the server', () => {
		expect(
			reducer(initialState, {
				type: GET_REQUESTS_FAILURE,
				payload: 'network error'
			})
		).toEqual({
			loading: 'none',
			requests: [],
			error: 'network error',
			open: true
		});
	});
	it('Should return an object with no error', () => {
		expect(
			reducer(initialState, {
				type: GET_REQUESTS_SUCCESS,
				payload: requestsMockData.responseOnSuccess.data
			})
		).toEqual({
			loading: 'none',
			requests: requestsMockData.responseOnSuccess.data,
			error: '',
			open: false
		});
	});
});
