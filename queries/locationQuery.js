const { where } = require("sequelize");
const db = require("../models/index");

const getLocations = async () => {
  const locations = await db.location.findAll({
    include: [
      {
        model: db.location_price,
        as: "location_price",
      },
    ],
  });
  return locations;
};

const getALocation = async (id) => {
  const location = await db.location.findById({
    where: { id: id },
    include: [
      {
        model: db.location_price,
        as: "location_price",
      },
    ],
  });
  return location;
};

const createLocation = async (locationData) => {
  const location = await db.location.create(locationData);
  return location;
};

const updateLocation = async (id, locationData) => {
  const [count] = await db.location.update(locationData, {
    where: { id: id },
  });
  return count;
};

const deleteLocation = async (id) => {
  const [count] = await db.location.detroy({
    where: { id: id },
  });
  return count;
};

module.exports = {
  getALocation,
  getLocations,
  updateLocation,
  deleteLocation,
  createLocation,
};
