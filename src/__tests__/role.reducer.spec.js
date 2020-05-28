import { USER_ROLE_SETTINGS } from "../redux/types/roleSettingsType";
import {
  ADD_ROOMS,
  ADD_ACCOMMODATION_REQUEST,
} from "../redux/types/accommodationTypes";
import { USER_SIGN_UP } from "../redux/types/SignupTypes";
import { cleanup } from "@testing-library/react";
import user from "../redux/reducers/roleReducer";
import room from "../redux/reducers/addRoomReducer";
import accommodation from "../redux/reducers/addAccomReducer";
import userSignUp from "../redux/reducers/signupReducer";

describe("ROLE REDUCER", () => {
  const initialState = {};
  afterEach(cleanup);
  it("Should return an object", () => {
    expect(user(initialState, { type: USER_ROLE_SETTINGS })).toEqual({});
  });
});

describe("ROOM REDUCER", () => {
  const initialState = {};
  afterEach(cleanup);
  it("Should return an object", () => {
    expect(room(initialState, { type: ADD_ROOMS })).toEqual({});
  });
});

describe("ACCOMMODATION REDUCER", () => {
  const initialState = {};
  afterEach(cleanup);
  it("Should return an object", () => {
    expect(
      accommodation(initialState, { type: ADD_ACCOMMODATION_REQUEST })
    ).toEqual({});
  });
});

describe("SIGNUP REDUCER", () => {
  const initialState = {};
  afterEach(cleanup);
  it("Should return an object", () => {
    expect(userSignUp(initialState, { type: USER_SIGN_UP })).toEqual({});
  });
});
