import {
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAILURE,
	CLOSE_MESSAGE
} from '../redux/types/resetPasswordTypes';
import { cleanup } from '@testing-library/react';
import reducer from '../redux/reducers/resetPasswordReducer';

describe('RESET PASSWORD REDUCER', () => {
	const initialState = {
		loading: 'none',
		error: '',
		open: false
	};
	afterEach(cleanup);
	it('Should return an object with loading set true for start-up', () => {
		expect(reducer(initialState, { type: RESET_PASSWORD_REQUEST })).toEqual({
			...initialState,
			loading: 'block'
		});
	});
	it('Should return an object with an error if something went wrong on the server', () => {
		expect(
			reducer(initialState, {
				type: RESET_PASSWORD_FAILURE,
				payload: 'network error'
			})
		).toEqual({
			open: true,
			loading: 'none',
			error: 'network error'
		});
	});
	it('Should return an object with no error', () => {
		expect(
			reducer(initialState, {
				type: RESET_PASSWORD_SUCCESS
			})
		).toEqual({
			loading: 'none',
			error: '',
			open: false
		});
	});
	it('Should close the message display', () => {
		expect(
			reducer(initialState, {
				type: CLOSE_MESSAGE
			})
		).toEqual({
			loading: 'none',
			error: '',
			open: false
		});
	});
});
