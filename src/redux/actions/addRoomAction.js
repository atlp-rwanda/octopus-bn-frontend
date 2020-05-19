import { addRooms } from "./index";
import api from "../../helpers/roleHelper";

export const addRoom = (room) => (dispatch) =>
  api.admin.addRooms(room).then((room) => dispatch(addRooms(room)));
