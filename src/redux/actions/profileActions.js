import axios from 'axios';
import {
   UPDATE_USER_PROFILE , 
   UPDATE_USER_PROFILE_SUCCESS,
   UPDATE_USER_PROFILE_FAILURE
  } from '../types/profileActionTypes';


const updateProfileSuccess = (message, token, data) => {
  return {
    type: UPDATE_USER_PROFILE_SUCCESS,
    payload: message,
    token,
    data
  };
};

const updateProfileFailure = error => {
  return {
    type:  UPDATE_USER_PROFILE_FAILURE,
    payload: error
  };
};
const updateProfileRequest = () => {
  return {
    type: UPDATE_USER_PROFILE
  };
}
export const updateProfile = (data, accessToken) => {
  const token = accessToken?accessToken:localStorage.getItem('bn-token');
  return (dispatch) => {
    dispatch(updateProfileRequest());

    return axios.put('https://octopus-bn-backend.herokuapp.com/api/v1/auth/profile-settings',
        data,
          {
            headers: {
            'Content-Type': 'application/json',
            'x-access-token': `${token}`
          }
         }).then( res => {
           const {data: {message, token, data}}  = res;
           console.log(data);
          dispatch(updateProfileSuccess(message, token, data)); 
    }).catch(error => {
          dispatch(updateProfileFailure(error.response.data));
    })
}};
  

