const validate = (name, country, city, imageUrl, amenities, around) => {
  const errors = {};

  if (!name) {
    errors.name = "The accommodation name is required";
    errors.nameErrorStatus = true;
  }
  if (!country) {
    errors.country = "please select a country";
    errors.countryErrorStatus = true;
  }
  if (!city) {
    errors.city = "Please select a city";
    errors.cityErrorStatus = true;
  }
  if (!imageUrl) {
    errors.imageUrl = "You must upload an image";
    errors.imageErrorStatus = true;
  }
  if (amenities.length === 0) {
    errors.amenities = "The amenities are required";
    errors.amenitiesErrorStatus = true;
  }
  if (around.length === 0) {
    errors.around = "The around is required";
    errors.aroundErrorStatus = true;
  }
  return errors;
};

export default validate;
