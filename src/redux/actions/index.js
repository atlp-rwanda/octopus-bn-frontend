import { USER_SIGN_UP } from "../types/SignupTypes";

export const userSignUp = (user) => ({
  type: USER_SIGN_UP,
  user,
});
