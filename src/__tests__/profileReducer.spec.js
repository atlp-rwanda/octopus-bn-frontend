import profileReducer from '../redux/reducers/profileReducer';
import { 
    UPDATE_USER_PROFILE,
    UPDATE_USER_PROFILE_FAILURE,
    UPDATE_USER_PROFILE_SUCCESS
} from '../redux/types/profileActionTypes';

describe('Profile settings reducer tests', () => {
    it('Should return an object with loading set true for start-up', () => {
        const initialState = {
            loading: false,
            isUpdated: false,
            error: {},
            message: ''
          };
          expect(profileReducer(initialState, { type: UPDATE_USER_PROFILE})).toEqual({
            ...initialState,
            loading: true
        })
    })
    it('Should return an object with an error if something went wrong on the server', () => {
        const initialState = {
            loading: false,
            isUpdated: false,
            error: '',
            message: ''
          };
          expect(profileReducer(initialState, 
            { type: UPDATE_USER_PROFILE_FAILURE, 
              payload:'network error'})).toEqual({
                loading: false,
                isUpdated: false,
                error: 'network error'
        })
    })
    it('Should return an object with success message like so', () => {
        const initialState = {
            loading: false,
            isUpdated: false,
            message: ''
          };
          expect(profileReducer(initialState, 
            { type: UPDATE_USER_PROFILE_SUCCESS, 
              payload:'Your profile is updated successfully!'})).toEqual({
                loading: false,
                isUpdated: true,
                message: 'Your profile is updated successfully!'
        })
    })
})
