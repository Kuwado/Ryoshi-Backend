require("dotenv").config();
const { createUser, checkUserExist } = require("../queries/authQuery");
const transporter = require("../middlewares/mailMiddleware");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createNewUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await createUser(userData);
    if (newUser.message) {
      return res.status(400).json({ error: newUser.message });
    }
    res.status(200).json({
      message: "Register successfully",
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
module.exports = { createNewUser, checkLogin, checkAccountExist };
