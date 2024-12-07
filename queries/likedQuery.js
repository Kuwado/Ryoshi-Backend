const { where } = require("sequelize");
const db = require("../models/index");

const insertLike = async (likedData) => {
  const like = await db.Liked.create(likedData);
  return like;
};

const deleteLike = async (id) => {
  const count = await db.Liked.destroy({
    where: { id: id },
  });
  return count;
};

module.exports = {
  insertLike,
  deleteLike,
};
