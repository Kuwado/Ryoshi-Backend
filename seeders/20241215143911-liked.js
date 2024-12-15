"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      `SELECT id, email FROM user WHERE email IN ('nguyen.van.a@example.com', 'tran.thi.b@example.com', 'hoang.van.e@example.com')`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const userMap = {};
    users.forEach((user) => {
      userMap[user.email] = user.id;
    });

    await queryInterface.bulkInsert("liked", [
      {
        location_id: "8a334f10-12da-45df-b30b-2f1f2a4ba3ae",
        user_id: userMap["nguyen.van.a@example.com"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        location_id: "03312ca9-e36c-45bc-88b7-d81338f8496b",
        user_id: userMap["tran.thi.b@example.com"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        location_id: "3ab27297-ae9e-4fd3-9b3a-cef8eee6f6c7",
        user_id: userMap["hoang.van.e@example.com"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("liked", null, {});
  },
};
