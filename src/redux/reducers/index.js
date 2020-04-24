import { combineReducers } from 'redux';
import loginReducer from './loginReducer';

const allReducers = combineReducers({
	login: loginReducer
});

export default allReducers;
