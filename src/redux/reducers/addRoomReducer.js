import { ADD_ROOMS } from "../types/accommodationTypes";

export default function room(state = {}, action = {}) {
  switch (action.type) {
    case ADD_ROOMS:
      return {};
    default:
      return state;
  }
}
