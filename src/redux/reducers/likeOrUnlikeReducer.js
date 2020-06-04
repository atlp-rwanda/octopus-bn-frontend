import {
    ADD_LIKE_OR_DISLIKE_REQUEST, 
    ADD_LIKE_DISLIKE_SUCCESS,
    ADD_LIKE_DISLIKE_FAILURE
  } from '../types/likeOrUnlikeTypes';
  
  const initialState = {
    loading: false,
    isliked: false,
    error: ''
  };
  const likeUnlikeReducer = (state = initialState, {type, payload}) => {
      switch (type) {
        case ADD_LIKE_OR_DISLIKE_REQUEST:
          return {
            ...state,
            loading: true
        }
        case ADD_LIKE_DISLIKE_SUCCESS:
          return {
            ...state,
            loading: false,
            isliked: true
             
        }
        case ADD_LIKE_DISLIKE_FAILURE:
          return {
           ...state,
           loading: false,
           error: payload
        }
        default:
          return state;
      }
    };
  
  export default likeUnlikeReducer;
  