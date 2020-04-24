import { USER_SIGN_UP } from "../types/SignupTypes";

export default function user(state = {}, action = {}) {
  switch (action.type) {
    case USER_SIGN_UP:
      return {};
    default:
      return state;
  }
}
