import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';


const createMockStore = configureMockStore([thunk]);
const store = createMockStore({ accommodation: {}});

import {viewAllAccommodations} from '../redux/actions/accommodationAction';
describe('Accommodations action creator tests', () => {
    it('Should retrieve a vailable accommodations', async() => {
         store.dispatch(viewAllAccommodations(1, 5)).then(() => {
           expect (store.getActions()).toBeInstanceOf(Object);
       })
    })
})
