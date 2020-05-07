import { addAccommodations } from "./index";
import api from "../../helpers/roleHelper";

export const addAccommodation = (accommodation) => (dispatch) =>
  api.admin
    .addAccommodation(accommodation)
    .then((accommodation) => dispatch(addAccommodations(accommodation)));
