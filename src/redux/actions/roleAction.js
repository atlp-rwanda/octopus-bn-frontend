import { userRoleSettings } from "./index";
import api from "../../helpers/roleHelper";

export const roleSettings = (user) => (dispatch) =>
  api.admin.roleSettings(user).then((user) => dispatch(userRoleSettings(user)));
