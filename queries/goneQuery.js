const { where } = require("sequelize");
const db = require("../models/index");

const insertGone = async (goneData) => {
  const gone = await db.Gone.create(goneData);
  return gone;
};

const deleteGone = async (id) => {
  const count = await db.Gone.destroy({
    where: { id: id },
  });
  return count;
};

module.exports = { insertGone, deleteGone };
