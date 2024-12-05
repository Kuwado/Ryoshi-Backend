'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('location_price', {
      location_id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING
      },
      location_id: {
        type: Sequelize.STRING,
        references: {
          model: 'location', 
          key: 'location_id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('location_price');
  }
};