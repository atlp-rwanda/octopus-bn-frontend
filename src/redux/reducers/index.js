import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import signUp from './signupReducer';
import languageReducer from './languageReducer';
import profileReducer from './profileReducer'

const allReducers = combineReducers({
	login: loginReducer,
	signup: signUp,
	language: languageReducer,
	profile: profileReducer 
});

export default allReducers;
