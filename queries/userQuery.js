const { where } = require("sequelize");
const db = require("../models/index");

const getAllUsers = async () => {
  const users = await db.User.findAll({
    attributes: {
      exclude: ["password"],
    },
    include: [
      {
        model: db.location,
        as: "liked_location",
        through: {
          model: db.Liked,
          attributes: ["id"],
        },
      },
      {
        model: db.location,
        as: "gone_location",
        through: {
          model: db.Gone,
          attributes: ["id"],
        },
      },
    ],
  });
  return users;
};

const getUser = async (id) => {
  const user = await db.User.findByPk(id, {
    attributes: {
      exclude: ["password"],
    },
    include: [
      {
        model: db.location,
        as: "liked_location",
        through: {
          model: db.Liked,
          attributes: ["id"],
        },
      },
      {
        model: db.location,
        as: "gone_location",
        through: {
          model: db.Gone,
          attributes: ["id"],
        },
      },
    ],
  });
  return user;
};

const updateAva = async (id, ava) => {
  const [count] = await db.User.update(
    { ava: ava },
    {
      where: { id: id },
    }
  );
  return count;
};

const updateUser = async (id, userData) => {
  // console.log(userData);
  const [count] = await db.User.update(userData, {
    where: { id: id },
  });
  // console.log(count);
  return count;
};

const updatePass = async (id, newPass) => {
  const [count] = await db.User.update(
    { password: newPass },
    {
      where: { id: id },
    }
  );
  return count;
};

const forgotPass = async (email, newPass) => {
  const [count] = await db.User.update(
    { password: newPass },
    { where: { email: email } }
  );
  return count;
};

module.exports = {
  updateUser,
  getUser,
  updateAva,
  updatePass,
  forgotPass,
  getAllUsers,
};
