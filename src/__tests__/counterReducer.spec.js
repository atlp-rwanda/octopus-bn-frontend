import counetrReducer from '../redux/reducers/counter';

describe('Counter reducer', () => {
    it('should return set default state', () => {
        let state, defaultState = 0;
        state = counetrReducer(defaultState, {});
        expect(state).toEqual(defaultState);
    });
})
