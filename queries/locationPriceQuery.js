const db = require("../models/db");

const createNewPrice = async (priceData) => {
  const price = db.location_price.create(priceData);
  return price;
};

const updatePrice = async (id, priceData) => {
  const [count] = db.location_price.update(priceData, {
    where: { id: id },
  });
  return count;
};

const deletePrice = async (id) => {
  const [count] = db.location_price.destroy(id);
  return count;
};

module.exports = {
  createNewPrice,
  updatePrice,
  deletePrice,
};
