const db = require("../models/index");

const getAllTags = async () => {
  const tags = await db.Tag.findAll();
  return tags;
};

module.exports = { getAllTags };
