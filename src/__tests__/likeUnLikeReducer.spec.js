import likeUnlikeReducer from '../redux/reducers/likeOrUnlikeReducer';
import { 
    ADD_LIKE_OR_DISLIKE_REQUEST, 
    ADD_LIKE_DISLIKE_SUCCESS,
    ADD_LIKE_DISLIKE_FAILURE
} from '../redux/types/likeOrUnlikeTypes';

describe('Like and Unlike reducer tests', () => {
    it('Should return an object with loading set true for start-up', () => {
        const initialState = {
          loading: false,
          isliked: false,
          error: ''
          };
          expect(likeUnlikeReducer(initialState, { type: ADD_LIKE_OR_DISLIKE_REQUEST})).toEqual({
            ...initialState,
            loading: true
        })
    })
    it('Should return an object with an error if something went wrong on the server', () => {
        const initialState = {
          loading: false,
          isliked: false,
          error: ''
          };
          expect(likeUnlikeReducer(initialState, 
            { type: ADD_LIKE_DISLIKE_FAILURE, 
              payload:'network error'})).toEqual({
                ...initialState,
                error: 'network error'
        })
    })
    it('Should like or unlike successfully', () => {
        const initialState = {
          loading: false,
          isliked: false,
          error: ''
          };
          expect(likeUnlikeReducer(initialState, 
            { type: ADD_LIKE_DISLIKE_SUCCESS})).toEqual({
              ...initialState,
                isliked: true
        })
    })
})
