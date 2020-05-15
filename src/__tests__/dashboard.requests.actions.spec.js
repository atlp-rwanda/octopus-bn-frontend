import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { GET_REQUESTS_FAILURE, GET_REQUESTS_SUCCESS, GET_REQUESTS } from '../redux/types/requestsTypes';
import { getRequestsAction } from '../redux/actions/requestsAction';
import { requestsMockData } from '../__mocks__/requestsMock';
import { mockToken } from '../__mocks__/tokenMocks';

const { responseOnSuccess, successAction } = requestsMockData;
const createMockStore = configureMockStore([ thunk ]);
const store = createMockStore({ requests: {} });

const headers = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
	'x-access-token': `${mockToken}`
};
const options = { method: 'GET', headers: headers };
fetchMock.mock('https://octopus-bn-backend.herokuapp.com​/api/v1/trips/request', responseOnSuccess, options);

describe('REQUEST ACTION', () => {
	it('Should get requests successfully!', () => {
		const expectedActions = {
			profile: successAction,
			type: GET_REQUESTS_SUCCESS
		};
		store.dispatch(getRequestsAction()).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});
