import { increment, decrement } from '../redux/actions';

describe('Counter action creator', () =>{
    it ('should create an action creator to increment the counter', ()=>{
        const initialCount = 1
        const expectedAction = {
            type: 'INCREMENT',
            payload: initialCount
        }
        expect(increment(initialCount)).toEqual(expectedAction);
    })
    it ('should create an action creator to decrement the counter', ()=>{
        const initialCount = 2
        const expectedAction = {
            type: 'DECREMENT',
            payload: initialCount
        }
        expect(decrement(initialCount)).toEqual(expectedAction);
    })
})
