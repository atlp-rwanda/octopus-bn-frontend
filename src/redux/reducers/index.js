import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import signUp from "./signupReducer";
import languageReducer from "./languageReducer";
import profileReducer from "./profileReducer";
import roleReducer from "./roleReducer";

const allReducers = combineReducers({
  login: loginReducer,
  signup: signUp,
  language: languageReducer,
  profile: profileReducer,
  role: roleReducer,
});

export default allReducers;
