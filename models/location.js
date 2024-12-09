"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      location.belongsToMany(models.User, {
        through: models.Liked,
        foreignKey: "location_id",
        as: "liked_users",
        onDelete: "CASCADE",
      });
      location.belongsToMany(models.User, {
        through: models.Gone,
        foreignKey: "location_id",
        as: "gone_users",
        onDelete: "CASCADE",
      });
    }
  }
  location.init(
    {
      location_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.TEXT,
      },
      open_time: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
        },
      },
      close_time: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
        },
      },
      age_start: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
        },
      },
      age_end: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
        },
      },
      adult_price: {
        type: DataTypes.FLOAT,
      },
      child_price: {
        type: DataTypes.FLOAT,
      },
      images: {
        type: DataTypes.TEXT,
      },
      number_tourist: {
        type: DataTypes.BIGINT,
      },
    },
    {
      sequelize,
      tableName: "location",
      modelName: "location",
    }
  );
  return location;
};
