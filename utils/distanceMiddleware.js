const axios = require("axios");

const getDistance = async (address1, address2) => {
  try {
    const response1 = await axios.get(
      `https://nominatim.openstreetmap.org/search`,
      {
        params: {
          q: address1,
          format: "json",
          addressdetails: 1,
        },
      }
    );

    const response2 = await axios.get(
      `https://nominatim.openstreetmap.org/search`,
      {
        params: {
          q: address2,
          format: "json",
          addressdetails: 1,
        },
      }
    );

    const lat1 = parseFloat(response1.data[0].lat);
    const lon1 = parseFloat(response1.data[0].lon);
    const lat2 = parseFloat(response2.data[0].lat);
    const lon2 = parseFloat(response2.data[0].lon);

    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance.toFixed(2);
  } catch (error) {
    console.error("Error when calculate distance: ", error);
  }
};

module.exports = getDistance;
