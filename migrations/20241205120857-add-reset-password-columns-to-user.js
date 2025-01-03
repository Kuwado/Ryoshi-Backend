'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("user", "resetPasswordToken", {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn("user", "resetPasswordExpire", {
      type: Sequelize.DATE,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("user", "resetPasswordToken");
    await queryInterface.removeColumn("user", "resetPasswordExpire");
  }
};
