require("dotenv").config();
const { createUser, checkUserExist } = require("../queries/authQuery");
const transporter = require("../middlewares/mailMiddleware");
const db = require("../models/index"); // Đảm bảo rằng db đã được cấu hình đúng cách
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const transporters = require("../config/email"); // Đảm bảo bạn đã cấu hình transporter

const createNewUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await createUser(userData);
    if (newUser.message) {
      return res.status(400).json({ error: newUser.message });
    }
    const token = jwt.sign(
      { id: userExist.id, role: userExist.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    res.status(200).json({
      message: "Register successfully",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error:
        error.errors && error.errors.length > 0
          ? error.errors[0].message
          : "Something went wrong",
    });
  }
};

const checkLogin = async (req, res) => {
  try {
    const userData = req.body;
    const userExist = await checkUserExist(userData);
    if (!userExist) return res.status(400).json({ error: "Email not found" });
    const checkPassword = await bcrypt.compare(
      userData.password,
      userExist.password
    );
    if (!checkPassword)
      return res.status(400).json({
        error: "Password is incorrect",
      });

    const token = jwt.sign(
      { id: userExist.id, role: userExist.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    return res.status(200).json({
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      error:
        error.errors && error.errors.length > 0
          ? error.errors[0].message
          : "Something went wrong",
    });
  }
};

const checkAccountExist = async (req, res) => {
  try {
    const userData = req.body;
    const userExist = await checkUserExist(userData);
    if (!userExist) {
      return res.status(404).json({
        message: "Email not found",
      });
    }
    const token = jwt.sign({ email: userData.email }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    const mailOptions = {
      from: process.env.GMAIL,
      to: userData.email,
      subject: "Mã xác nhận đổi mật khẩu",
      text: `Mã xác nhận của bạn là: ${token}. Hãy nhập mã này để đổi mật khẩu.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email: ", error);
        return res.status(500).json({ message: "Send code to email error" });
      }
      res
        .status(200)
        .json({ message: "Code has been sent, please check your email" });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error:
        error.errors && error.errors.length > 0
          ? error.errors[0].message
          : "Something went wrong",
    });
  }
};
// controllers/authController.js
// Check mail + gọi hàm gửi mã otp
const forgotPassword = asyncErrorHandler(async (req, res, next) => {
  const user = await db.User.findOne({ where: { email: req.body.email } });

  if (!user) {
    return res.status(404).json({ message: "No user found with this email." });
  }
  const otp = `${Math.floor(1000 + Math.random() * 9000)}`; // OTP 4 chữ số
  await sendOtpEmail(user.email, otp);
  res.status(200).json({ message: "OTP has been sent to your email." });
  user.resetPasswordToken = otp;
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 phút
  await user.save();
});

// Hàm gửi mã otp
const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.MAIL_FROM,
    to: email,
    subject: "OTP Verification",
    text: `Your OTP code is: ${otp}`,
  };

  await transporters.sendMail(mailOptions);
};
// Hàm kiểm tra mã otp
const verifyOTP = async (req, res) => {
  try {
    let { id_post, otp_post } = req.body;
    if (!id_post || !otp_post) {
      return res.status(400).json({ message: "Email or OTP is missing" });
    }
    const user = await db.User.findOne({ where: { id: id_post } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const currentTime = Date.now();
    if (user.resetPasswordExpire < currentTime) {
      return res.status(400).json({ message: "OTP has expired" });
    }
    if (otp_post !== user.resetPasswordToken) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Ham update mat khau moi
const updatePasswordAfterOTP = async (req, res) => {
  try {
    const { id, new_password, confirm_password } = req.body;
    if (!id || !new_password || !confirm_password) {
      return res
        .status(400)
        .json({
          message: "User ID, new password and confirm password are required",
        });
    }
    if (new_password !== confirm_password) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const hashedPassword = await bcrypt.hash(new_password, 10);
    const user = await db.User.findOne({ where: { id: id } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNewUser,
  checkLogin,
  checkAccountExist,
  forgotPassword,
  verifyOTP,
  updatePasswordAfterOTP,
};
