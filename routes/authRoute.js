const express = require("express");
const route = express.Router();
const { createNewUser, checkLogin } = require("../controllers/authController");

route.post("/register", createNewUser);
route.post("/login", checkLogin);

module.exports = route;
