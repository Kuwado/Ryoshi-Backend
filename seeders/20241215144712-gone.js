"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      `SELECT id, email FROM user WHERE email IN ('nguyen.van.a@example.com', 'tran.thi.b@example.com', 'le.thi.d@example.com')`,

      { type: Sequelize.QueryTypes.SELECT }
    );

    const userMap = {};
    users.forEach(user => {
      userMap[user.email] = user.id; 
    });

    await queryInterface.bulkInsert("gone", [
      {
        location_id: "e804d924-6d7f-4510-8605-c62893be97a8", 
        user_id: userMap['nguyen.van.a@example.com'], 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        location_id: "ae981d6a-7530-4e3e-bb94-09efbcd85b2d",
        user_id: userMap['tran.thi.b@example.com'], 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        location_id: "3ab27297-ae9e-4fd3-9b3a-cef8eee6f6c7", 
        user_id: userMap['le.thi.d@example.com'], 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("gone", null, {});
  },
};
