import axios from "axios";

const token = localStorage.getItem("bn-token");
const header = {
  headers: {
    "Content-Type": "application/json",
    "x-access-token": `${token}`,
  },
};
export default {
  admin: {
    roleSettings: (data) =>
      axios
        .post(
          "https://octopus-bn-backend.herokuapp.com/api/v1/auth/assign-roles",
          {
            email: data.email,
            role: data.role,
          },
          header
        )
        .then((res) => res.data.user),
    addAccommodation: (data) =>
      axios
        .post(
          "https://octopus-bn-backend.herokuapp.com/api/v1/accommodations",
          {
            name: data.name,
            city: data.city,
            country: data.country,
            city: data.city,
            imageUrl: data.imageUrl,
            amenities: data.amenities,
            around: data.around,
          },
          header
        )
        .then((res) => res.data.accommodation),
  },
};
