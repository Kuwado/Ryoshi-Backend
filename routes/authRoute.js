const express = require("express");
const route = express.Router();
const {
  createNewUser,
  checkLogin,
  checkAccountExist,
} = require("../controllers/authController");

route.post("/register", createNewUser);
route.post("/login", checkLogin);
route.post("/checkEmail", checkAccountExist);

module.exports = route;
