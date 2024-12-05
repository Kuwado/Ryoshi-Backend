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
      location.hasMany(models.location_price, {
        foreignKey: "location_id",
        as: "location_price",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
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
      images: {
        type: DataTypes.TEXT,
      },
      number_tourist: {
        type: DataTypes.BIGINT,
      },
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      tableName: "location",
      modelName: "location",
    }
  );
  return location;
};
