import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { 
    UPDATE_USER_PROFILE
} from '../redux/types/profileActionTypes';
import {updateProfile} from '../redux/actions/profileActions';
import { profileMockData } from '../utils/mockData/profile';

const {payload, responseOnSuccess, 
       token,successAction,failureAction,
       invalidPayload
       } = profileMockData;
const createMockStore = configureMockStore([thunk]);
const store = createMockStore({ profile: {}});

const headers = {'Accept': 'application/json', 
                 'Content-Type':'application/json',
                 'x-access-token': `${token}`
                };
const options = {method: "PUT", headers: headers, body: payload};
fetchMock.mock('https://octopus-bn-backend.herokuapp.com/api/v1/auth/profile-settings',responseOnSuccess, options);

describe('Profile settings action creator tests', () => {

    it('Should update profile successfully!', () => {

        const expectedActions = {
            profile: successAction,
            type: UPDATE_USER_PROFILE
            };
       store.dispatch(updateProfile(payload, token)).then(() => {
           expect (store.getActions()).toEqual(expectedActions);
       })
    })
    it('Should fail to update profile when bad request is encountered!', () => {

        const expectedActions = {
            profile: failureAction,
            type: UPDATE_USER_PROFILE
            };
       store.dispatch(updateProfile(invalidPayload, token)).then(() => {
           expect (store.getActions()).toEqual(expectedActions);
       })
    })
})
