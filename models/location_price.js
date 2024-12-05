"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class location_price extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      location_price.belongsTo(models.location, {
        foreignKey: 'location_id',
        as: 'location',
      });
    }
  }
  location_price.init(
    {
      location_price_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.FLOAT,
      },
      location_id: {
        type: DataTypes.STRING,
        references: {
          model: "location",
          key: "location_id",
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
    },
    {
      sequelize,
      tableName: "location_price",
      modelName: "location_price",
    }
  );
  return location_price;
};
