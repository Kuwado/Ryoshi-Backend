const { createUser, checkUserExist } = require("../queries/authQuery");
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
    if (userExist) return res.status(200).json({ message: "Email exists" });
    res.status(400).json({ error: "Account not found" });
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
