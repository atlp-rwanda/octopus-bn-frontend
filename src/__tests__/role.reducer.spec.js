import { USER_ROLE_SETTINGS } from '../redux/types/roleSettingsType';
import { cleanup } from '@testing-library/react';
import user from '../redux/reducers/roleReducer';

describe('ROLE REDUCER', () => {
	const initialState = {};
	afterEach(cleanup);
	it('Should return an object', () => {
		expect(user(initialState, { type: USER_ROLE_SETTINGS })).toEqual({});
	});
});
