import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import signUp from "./signupReducer";
import languageReducer from "./languageReducer";
import profileReducer from "./profileReducer";
import roleReducer from "./roleReducer";
import sendMailReducer from './sendMailReducer';
import resetPasswordReducer from './resetPasswordReducer'


const allReducers = combineReducers({
  login: loginReducer,
  signup: signUp,
  language: languageReducer,
  profile: profileReducer,
  role: roleReducer,
  sendEmail: sendMailReducer,
  resetPassword: resetPasswordReducer,
  
});

export default allReducers;
