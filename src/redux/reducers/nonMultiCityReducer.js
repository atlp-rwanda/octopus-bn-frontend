import {
    NEW_TRIP_REQUEST,
    NEW_TRIP_REQUEST_FAILURE,
    NEW_TRIP_REQUEST_SUCCESS,
    CLOSE_MESSAGE
} from '../types/newTripTypes';


const initialState = {
    loading: 'none',
    newTripRequest: {},
    open: false,
    error: '',
};

const nonMultiCityReducer = (state = initialState, action) => {
    switch (action.type) {

        case NEW_TRIP_REQUEST:
            return {
                ...state,
                loading: 'block'
            }
        case NEW_TRIP_REQUEST_SUCCESS:
            return {
                ...state,
                loading: 'none',
                newTripRequest: action.newTripRequest,
            }

        case NEW_TRIP_REQUEST_FAILURE:
            return {
                ...state,
                loading: 'none',
                newTripRequest: action.newTripRequest,
                error: action.error,
                open: true,
            }
        case CLOSE_MESSAGE:
            return {
                loading: 'none',
                newTripRequest: {},
                open: false,
                error: '',
            }
        default:
            return state;
    }
}

export default nonMultiCityReducer;

