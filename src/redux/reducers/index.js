import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import signUp from './signupReducer';
import sendMailReducer from '../reducers/sendMailReducer';
import languageReducer from './languageReducer';

const allReducers = combineReducers({
	login: loginReducer,
  signup: signUp,
  sendEMail: sendMailReducer,
	language: languageReducer
});

export default allReducers;
