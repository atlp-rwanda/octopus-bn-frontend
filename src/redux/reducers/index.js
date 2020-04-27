import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import signUp from './signupReducer';
import languageReducer from './languageReducer';

const allReducers = combineReducers({
	login: loginReducer,
	signup: signUp,
	language: languageReducer
});

export default allReducers;
