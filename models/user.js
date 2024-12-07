"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.location, {
        through: models.Liked,
        foreignKey: "user_id",
        as: "liked_location",
        onDelete: "CASCADE",
      });
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
      role: {
        type: DataTypes.ENUM("admin", "user", "guest"),
        defaultValue: "user",
      },
      resetPasswordToken: {
        type: DataTypes.STRING,
      },
      resetPasswordExpire: {
        type: DataTypes.DATE,
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
  // User.prototype.createResetPasswordToken = function () {
  //   const resetToken = crypto.randomBytes(32).toString("hex");
  //   this.resetPasswordToken = crypto
  //     .createHash("sha256")
  //     .update(resetToken)
  //     .digest("hex");
  //   this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  //   console.log(resetToken, this.resetPasswordToken);
  //   return resetToken;
  // };
  return User;
};
