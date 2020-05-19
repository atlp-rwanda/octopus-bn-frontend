import { USER_SIGN_UP } from "../types/SignupTypes";
import { USER_ROLE_SETTINGS } from "../types/roleSettingsType";
import {
  ADD_ACCOMMODATION_REQUEST,
  ADD_ROOMS,
} from "../types/accommodationTypes";

export const userSignUp = (user) => ({
  type: USER_SIGN_UP,
  user,
});

export const userRoleSettings = (user) => ({
  type: USER_ROLE_SETTINGS,
  user,
});

export const addAccommodations = (accommodation) => ({
  type: ADD_ACCOMMODATION_REQUEST,
  accommodation,
});

export const addRooms = (room) => ({
  type: ADD_ROOMS,
  room,
});
