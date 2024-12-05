"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("location", {
      location_id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.TEXT,
      },
      open_time: {
        type: Sequelize.INTEGER,
        validate: {
          isInt: true,
        },
      },
      close_time: {
        type: Sequelize.INTEGER,
        validate: {
          isInt: true,
        },
      },
      age_start: {
        type: Sequelize.INTEGER,
        validate: {
          isInt: true,
        },
      },
      age_end: {
        type: Sequelize.INTEGER,
        validate: {
          isInt: true,
        },
      },
      images: {
        type: Sequelize.TEXT,
      },
      number_tourist: {
        type: Sequelize.BIGINT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("location");
  },
};
