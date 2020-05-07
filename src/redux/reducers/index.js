import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import signUp from './signupReducer';
import languageReducer from './languageReducer';
import profileReducer from './profileReducer';
import roleReducer from './roleReducer';
import requestsReducer from './requestsReducer';

const allReducers = combineReducers({
	login: loginReducer,
	signup: signUp,
	language: languageReducer,
	profile: profileReducer,
	role: roleReducer,
	requests: requestsReducer,
});

export default allReducers;
