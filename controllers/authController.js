require("dotenv").config();
const {
  createUser,
  checkUserExist,
  saveUser,
  updatePassword,
} = require("../queries/authQuery");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporters = require("../config/email");

const createNewUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await createUser(userData);
    if (newUser.message) {
      return res.status(400).json({ error: newUser.message });
    }
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
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

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await checkUserExist({ email });
  if (!user) {
    return res.status(404).json({ message: "No user found with this email." });
  }
  const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
  await sendOtpEmail(user.email, otp);
  res.status(200).json({ message: "OTP has been sent to your email." });
  await saveUser(user, otp);
};

const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.MAIL_FROM,
    to: email,
    subject: "OTP Verification",
    text: `Your OTP code is: ${otp}`,
  };

  await transporters.sendMail(mailOptions);
};

const verifyOTP = async (req, res) => {
  try {
    let { email, otp_post } = req.body;
    const user = await checkUserExist({ email });
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

const updatePasswordAfterOTP = async (req, res) => {
  try {
    const { email, new_password } = req.body;
    const hashedPassword = await bcrypt.hash(new_password, 10);
    const user = await checkUserExist({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await updatePassword(email, hashedPassword);
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNewUser,
  checkLogin,
  forgotPassword,
  verifyOTP,
  updatePasswordAfterOTP,
};
