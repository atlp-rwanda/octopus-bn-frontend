import { ADD_ACCOMMODATION_REQUEST } from "../types/accommodationTypes";

export default function user(state = {}, action = {}) {
  switch (action.type) {
    case ADD_ACCOMMODATION_REQUEST:
      return {};
    default:
      return state;
  }
}
