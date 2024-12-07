const { where } = require("sequelize");
const db = require("../models/index");

const getLocations = async () => {
  const locations = await db.location.findAll();
  return locations;
};

const getALocation = async (id) => {
  const location = await db.location.findByPk(id);
  return location;
};

const createLocation = async (locationData) => {
  const location = await db.location.create(locationData);
  return location;
};

const updateLocation = async (id, locationData) => {
  const [count] = await db.location.update(locationData, {
    where: { location_id: id },
  });
  return count;
};

const deleteLocation = async (id) => {
  const count = await db.location.destroy({
    where: { location_id: id },
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
