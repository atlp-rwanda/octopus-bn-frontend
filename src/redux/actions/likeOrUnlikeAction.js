import axios from 'axios';
import {
    ADD_LIKE_OR_DISLIKE_REQUEST, 
    ADD_LIKE_DISLIKE_SUCCESS,
    ADD_LIKE_DISLIKE_FAILURE
  } from '../types/likeOrUnlikeTypes';


const addLikeOrUnlikeSuccess = () => {
  return {
    type: ADD_LIKE_DISLIKE_SUCCESS
  };
};

const addLikeOrUnlikeFailure = error => {
  return {
    type: ADD_LIKE_DISLIKE_FAILURE,
    payload: error
  };
};
const addLikeOrUnlikeRequest = () => {
  return {
    type: ADD_LIKE_OR_DISLIKE_REQUEST
  };
}
export const likeOrUnlike = (accommodationId, accessToken) => {
  const token = accessToken?accessToken:localStorage.getItem('bn-token');
  return (dispatch) => {
    dispatch(addLikeOrUnlikeRequest());
    axios.post(`https://octopus-bn-backend.herokuapp.com/api/v1/accommodations/like-unlike/${accommodationId}`,
         {},
         {
            headers: {
            'Content-Type': 'application/json',
            'x-access-token': `${token}`
          }
         }).then( res => {
          dispatch(addLikeOrUnlikeSuccess()); 
    }).catch(error => {
          dispatch(addLikeOrUnlikeFailure(error.response.error));
    })
}};
  

