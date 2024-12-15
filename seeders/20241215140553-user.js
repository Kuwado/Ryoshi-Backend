"use strict";

const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  async up(queryInterface, Sequelize) {
    // Hash passwords
    const hashedPasswords = await Promise.all([
      bcrypt.hash("password123", saltRounds),
      bcrypt.hash("securepass456", saltRounds),
      bcrypt.hash("mypassword789", saltRounds),
      bcrypt.hash("strongpass000", saltRounds),
      bcrypt.hash("simplepass321", saltRounds),
    ]);

    // Insert data
    await queryInterface.bulkInsert(
      "user", // Ensure the table name matches your actual database table
      [
        {
          email: "nguyen.van.a@example.com",
          password: hashedPasswords[0],
          name: "Nguyễn Văn A",
          dob: "1990-01-01",
          address: "Hà Nội",
          phone: "0987654321",
          gender: "male",
          interest: "Du lịch, Đọc sách",
          ava: "dalat.jpg",
          children_ages: "",
          role: "user",
          resetPasswordToken: null,
          resetPasswordExpire: null
        },
        {
          email: "tran.thi.b@example.com",
          password: hashedPasswords[1],
          name: "Trần Thị B",
          dob: "1985-05-15",
          address: "TP. Hồ Chí Minh",
          phone: "0912345678",
          gender: "female",
          interest: "Mua sắm, Ẩm thực",
          ava: "dalat.jpg",
          children_ages: "3,5",
          role: "user",
          resetPasswordToken: null,
          resetPasswordExpire: null
        },
        {
          email: "pham.van.c@example.com",
          password: hashedPasswords[2],
          name: "Phạm Văn C",
          dob: "1995-10-20",
          address: "Đà Nẵng",
          phone: "0934567890",
          gender: "male",
          interest: "Thể thao, Công nghệ",
          ava: "dalat.jpg",
          children_ages: "",
          role: "admin",
          resetPasswordToken: null,
          resetPasswordExpire: null
        },
        {
          email: "le.thi.d@example.com",
          password: hashedPasswords[3],
          name: "Lê Thị D",
          dob: "1998-03-10",
          address: "Cần Thơ",
          phone: "0945678901",
          gender: "female",
          interest: "Nấu ăn, Chụp ảnh",
          ava: "dalat.jpg",
          children_ages: "",
          role: "user",
          resetPasswordToken: null,
          resetPasswordExpire: null
        },
        {
          email: "hoang.van.e@example.com",
          password: hashedPasswords[4],
          name: "Hoàng Văn E",
          dob: "1982-08-25",
          address: "Hải Phòng",
          phone: "0976543210",
          gender: "male",
          interest: "Xem phim, Âm nhạc",
          ava: "dalat.jpg",
          children_ages: "8,10",
          role: "user",
          resetPasswordToken: null,
          resetPasswordExpire: null
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user", null, {});
  },
};
