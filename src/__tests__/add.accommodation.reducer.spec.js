import { ADD_ACCOMMODATION_REQUEST } from '../redux/types/accommodationTypes';
import { cleanup } from '@testing-library/react';
import reducer from '../redux/reducers/accommodationReducer';
describe('ACCOMMODATION REDUCER', () => {
	const initialState = {};
	afterEach(cleanup);
	it('Should return an object with loading set true for start-up', () => {
		expect(reducer(initialState, { type: ADD_ACCOMMODATION_REQUEST })).toEqual({
			allAccommodations: [],
			error: '',
			loading: false
		});
	});
});
