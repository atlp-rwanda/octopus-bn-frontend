import { userSignUp } from "./index";
import api from "../../helpers/signuphelper";

export const signup = (data) => (dispatch) =>
  api.user.signup(data).then((user) => dispatch(userSignUp(user)));
