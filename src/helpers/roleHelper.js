import axios from "axios";

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
          {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": `${localStorage.getItem("bn-token")}`,
            },
          }
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
          {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": `${localStorage.getItem("bn-token")}`,
            },
          }
        )
        .then((res) => res.data.accommodation),
    addRooms: (data) =>
      axios
        .post(
          "https://octopus-bn-backend.herokuapp.com/api/v1/accommodations/room",
          {
            accommodationsID: data.accommodationsID,
            roomNumber: data.roomNumber,
            cost: data.cost,
            currency: data.currency,
            type: data.type,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": `${localStorage.getItem("bn-token")}`,
            },
          }
        )
        .then((res) => res.data.room),
  },
};
