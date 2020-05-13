import accommodationReducer from '../redux/reducers/accommodationReducer';
import { 
    VIEW_ALL_ACCOMMODATIONS, 
    VIEW_ALL_ACCOMMODATIONS_SUCCESS,
    VIEW_ALL_ACCOMMODATIONS_FAILURE
} from '../redux/types/accommodationTypes';

describe('Accommodation Reducer tests', () => {
    it('Should return an object with loading set true for start-up', () => {
        const initialState = {
            loading: true,
            allAccommodations:[],
            error:''
          };
          expect(accommodationReducer(initialState, { type: VIEW_ALL_ACCOMMODATIONS})).toEqual({
            ...initialState,
            loading: true
        })
    })
    it('Should return an object with an error if something went wrong on the server', () => {
        const initialState = {
            loading: false,
            error: '',
          };
          expect(accommodationReducer(initialState, 
            { type: VIEW_ALL_ACCOMMODATIONS_FAILURE, 
              payload:'network error'})).toEqual({
                loading: false,
                error: 'network error'
        })
    })
    it('Should return a list of all available accommodations', () => {
        const initialState = {
            loading: false,
          };
          expect(accommodationReducer(initialState, 
            { type: VIEW_ALL_ACCOMMODATIONS_SUCCESS, 
                payload: []})).toEqual({
                loading: false,
                allAccommodations:[]
        })
    })
})
