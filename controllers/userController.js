const {
  updateUser,
  getUser,
  updateAva,
  updatePass,
  forgotPass,
} = require("../queries/userQuery");
const bcrypt = require("bcrypt");

const getUserInfo = async (req, res) => {
  const id = req.params.id;
  const user = await getUser(id);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  return res.status(200).json({
    message: "OK",
    user: user,
  });
};

const updateUserInfo = async (req, res) => {
  try {
    const id = req.params.id;
    const userData = req.body;
    // console.log(userData);
    const count = await updateUser(id, userData);
    if (count > 0) {
      return res.status(200).json({
        message: "User information updated successfully",
      });
    } else
      return res.status(400).json({
        message: "Users not found or no changes made",
      });
  } catch (error) {
    return res.status(404).json({
      error:
        error.errors && error.errors.length > 0
          ? error.errors[0].message
          : "Something went wrong",
    });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const avatar = req.file.filename;
    const id = req.params.id;
    const count = await updateAva(id, avatar);
    if (count > 0) {
      return res.status(200).json({
        message: "Avatar updated successfully",
      });
    } else
      return res.status(400).json({
        message: "Users not found or no changes made",
      });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      error:
        error.errors && error.errors.length > 0
          ? error.errors[0].message
          : "Something went wrong",
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    const id = req.params.id;
    const count = await updatePass(id, password);
    if (count > 0) {
      return res.status(200).json({
        message: "Password updated successfully",
      });
    } else
      return res.status(400).json({
        message: "Users not found or no changes made",
      });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      error:
        error.errors && error.errors.length > 0
          ? error.errors[0].message
          : "Something went wrong",
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    const email = req.body.email;
    const count = await forgotPass(email, password);
    if (count > 0) {
      return res.status(200).json({
        message: "Password updated successfully",
      });
    } else
      return res.status(400).json({
        message: "Users not found or no changes made",
      });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      error:
        error.errors && error.errors.length > 0
          ? error.errors[0].message
          : "Something went wrong",
    });
  }
};
module.exports = {
  updateUserInfo,
  getUserInfo,
  updateAvatar,
  updatePassword,
  forgotPassword,
};
