const validate = (accommodationsID, roomNumber, cost, currency, type) => {
  const errors = {};

  if (!accommodationsID) {
    errors.accommodation = "You must specify the accommodation";
    errors.accommodationErrorStatus = true;
  }
  if (!roomNumber) {
    errors.room = "The room number is required";
    errors.roomErrorStatus = true;
  }
  if (!cost) {
    errors.cost = "The cost is required";
    errors.costErrorStatus = true;
  }
  if (!currency) {
    errors.currency = "You must select a currency";
    errors.currencyErrorStatus = true;
  }
  if (!type) {
    errors.type = "You must select the room type";
    errors.typeErrorStatus = true;
  }
  return errors;
};

export default validate;
