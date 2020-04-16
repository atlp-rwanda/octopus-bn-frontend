import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middlwares = applyMiddleware(logger, thunk);
const store =  createStore(rootReducer,{} ,composeWithDevTools(middlwares));

export default store;
