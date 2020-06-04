import axios from 'axios';
import {
   VIEW_ALL_ACCOMMODATIONS, 
   VIEW_ALL_ACCOMMODATIONS_SUCCESS,
   VIEW_ALL_ACCOMMODATIONS_FAILURE,
  } from '../types/accommodationTypes';


const viewAllAccommodationsSuccess = (data) => {
  return {
    type: VIEW_ALL_ACCOMMODATIONS_SUCCESS,
    payload: data,
  };
};

const viewAllAccommodationsFailure = error => {
  return {
    type:  VIEW_ALL_ACCOMMODATIONS_FAILURE,
    payload: error
  };
};
const viewAllAccommodationsRequest = () => {
  return {
    type: VIEW_ALL_ACCOMMODATIONS
  };
}
export const viewAllAccommodations = (page, limit = 6, accessToken) => {
  const token = accessToken?accessToken:localStorage.getItem('bn-token');
  return (dispatch) => {
    dispatch(viewAllAccommodationsRequest());

    return axios.get(`https://octopus-bn-backend.herokuapp.com/api/v1/accommodations/all-accommodations?page=${page}&limit=${limit}`,
          {
            headers: {
            'Content-Type': 'application/json',
            'x-access-token': `${token}`
          }
         }).then( res => {
           const {data: {data}}  = res;
          dispatch(viewAllAccommodationsSuccess(data.allAccommodations));
    }).catch(error => {
          dispatch(viewAllAccommodationsFailure(error.response.data));
    })
}};
  

