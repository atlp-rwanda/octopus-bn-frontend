import { USER_ROLE_SETTINGS } from "../types/roleSettingsType";

export default function user(state = {}, action = {}) {
  switch (action.type) {
    case USER_ROLE_SETTINGS:
      return {};
    default:
      return state;
  }
}
