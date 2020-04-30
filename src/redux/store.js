import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import rootReducer from './reducers';
import logger from 'redux-logger';
const middlwares = applyMiddleware(thunk, promise, logger);
const store = createStore(rootReducer, {}, composeWithDevTools(middlwares));

export default store;
