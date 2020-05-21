import { USER_SIGN_UP } from '../redux/types/SignupTypes';
import { cleanup } from '@testing-library/react';
import reducer from '../redux/reducers/signupReducer';
describe('SIGNUP REDUCER', () => {
	const initialState = {};
	afterEach(cleanup);
	it('Should return an object with loading set true for start-up', () => {
		expect(reducer(initialState, { type: USER_SIGN_UP })).toEqual({});
	});
});
