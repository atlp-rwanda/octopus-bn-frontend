import {
    ADD_ACCOMMODATION_REQUEST,
    VIEW_ALL_ACCOMMODATIONS, 
    VIEW_ALL_ACCOMMODATIONS_SUCCESS,
    VIEW_ALL_ACCOMMODATIONS_FAILURE
  } from '../types/accommodationTypes';
  
  const initialState = {
    loading: false,
    allAccommodations:[],
    error:''
  };
  const accommodationReducer = (state = initialState, action) => {
      switch (action.type) {
        case VIEW_ALL_ACCOMMODATIONS:
          return {
            ...state,
            loading: true
        }
        case VIEW_ALL_ACCOMMODATIONS_SUCCESS:
          return {
            loading: false,
            allAccommodations: action.payload
        }
        case VIEW_ALL_ACCOMMODATIONS_FAILURE:
          return {
            loading: false,
            error: action.payload
        }
        case ADD_ACCOMMODATION_REQUEST:
          return initialState;
          default:
           return state;
      }
    };
  
  export default accommodationReducer;
