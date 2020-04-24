import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import signUp from "./signupReducer";

const allReducers = combineReducers({
  login: loginReducer,
  signup: signUp,
});

export default allReducers;
