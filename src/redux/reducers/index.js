import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import signUp from './signupReducer';
import languageReducer from './languageReducer';
import profileReducer from './profileReducer';
import roleReducer from './roleReducer';
import requestsReducer from './requestsReducer';
import resetPasswordReducer from './resetPasswordReducer';
import accommodationReducer from '../reducers/accommodationReducer';
import AvailRequestsReducer from './AvailRequestsReducer';
import addRoomReducer from "./addRoomReducer";
import likeOrUnlikeReducer from './likeOrUnlikeReducer';


const allReducers = combineReducers({
	login: loginReducer,
	signup: signUp,
	language: languageReducer,
	profile: profileReducer,
	role: roleReducer,
	resetPassword: resetPasswordReducer,
	requests: requestsReducer,
	accommodation: accommodationReducer,
	addRoom: addRoomReducer,
	availRequests: AvailRequestsReducer,
	likeOrUnLike: likeOrUnlikeReducer
});
export default allReducers;
