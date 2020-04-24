import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import rootReducer from "./reducers";

const middlwares = applyMiddleware(logger, thunk, promise);
const store = createStore(rootReducer, {}, composeWithDevTools(middlwares));

export default store;
