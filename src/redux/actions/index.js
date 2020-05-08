import { USER_SIGN_UP } from "../types/SignupTypes";
import { USER_ROLE_SETTINGS } from "../types/roleSettingsType";

export const userSignUp = (user) => ({
  type: USER_SIGN_UP,
  user,
});

export const userRoleSettings = (user) => ({
  type: USER_ROLE_SETTINGS,
  user,
});
