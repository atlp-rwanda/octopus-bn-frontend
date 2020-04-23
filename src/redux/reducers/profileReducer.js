import {
  UPDATE_USER_PROFILE, 
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE
} from '../types/profileActionTypes';

const initialState = {
  loading: false,
  isUpdated: false,
  error: {},
  message: '',
  token: '',
  data:{}
};
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_USER_PROFILE:
        return {
          ...state,
          loading: true
      }
      case UPDATE_USER_PROFILE_SUCCESS:
        return {
          loading: false,
          isUpdated: true,
          message: action.payload,
          token: action.token,
          data: action.data
      }
      case UPDATE_USER_PROFILE_FAILURE:
        return {
          loading: false,
          isUpdated: false,
          error: action.payload
      }
      default:
        return state;
    }
  };

export default profileReducer;
