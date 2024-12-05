const express = require("express");
const route = express.Router();
const {
  createNewUser,
  checkLogin,
  checkAccountExist,
  forgotPassword,
  verifyOTP,
  updatePasswordAfterOTP
} = require("../controllers/authController");

route.post("/register", createNewUser);
route.post("/login", checkLogin);
route.post("/forgot-password",forgotPassword); 
route.post("/verify-otp",verifyOTP);
route.post("/update-password",updatePasswordAfterOTP);
module.exports = route;
