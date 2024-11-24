"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
      dob: {
        type: DataTypes.DATE,
      },
      address: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
        validate: {
          isNumeric: true,
          len: [9, 15],
        },
      },
      gender: {
        type: DataTypes.ENUM("male", "female", "other"),
      },
      interest: {
        type: DataTypes.TEXT,
      },
      ava: {
        type: DataTypes.STRING,
      },
      children_ages: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "user",
      timestamps: false,
      paranoid: false,
    }
  );
  User.addHook("beforeCreate", async (user) => {
    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);
  });
  return User;
};
