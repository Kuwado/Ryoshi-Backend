const {
  updateUser,
  getUser,
  updateAva,
  updatePass,
  forgotPass,
} = require("../queries/userQuery");
const { getLocations } = require("../queries/locationQuery");
const bcrypt = require("bcrypt");
const getDistance = require("../utils/distanceMiddleware");

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
        message: "ユーザー情報が正常に更新されました。",
      });
    } else
      return res.status(400).json({
        message: "ユーザーが見つかりませんでした。",
      });
  } catch (error) {
    return res.status(404).json({
      error:
        error.errors && error.errors.length > 0
          ? error.errors[0].message
          : "問題が発生しました。",
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
        message: "アバターが正常に更新されました。",
      });
    } else
      return res.status(400).json({
        message: "ユーザーが見つかりませんでした。",
      });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      error:
        error.errors && error.errors.length > 0
          ? error.errors[0].message
          : "問題が発生しました。",
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
        message: "パスワードが正常に更新されました。",
      });
    } else
      return res.status(400).json({
        message: "ユーザーが見つかりませんでした。",
      });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      error:
        error.errors && error.errors.length > 0
          ? error.errors[0].message
          : "問題が発生しました。",
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    const email = req.body.email;
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const count = await forgotPass(email, password);
    if (count > 0) {
      return res.status(200).json({
        message: "パスワードが正常に更新されました",
      });
    } else
      return res.status(400).json({
        message: "ユーザーが見つかりませんでした。",
      });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      error:
        error.errors && error.errors.length > 0
          ? error.errors[0].message
          : "問題が発生しました。",
    });
  }
};

const getDistanceFromLocation = async (req, res) => {
  try {
    const user = await getUser(req.params.id);
    const userAddress = user.address;
    const locations = await getLocations();
    const distances = [];
    for (let location of locations) {
      const locationAddress = location.address;
      const distance = await getDistance(userAddress, locationAddress);
      distances.push({
        location_id: location.location_id,
        name: location.name,
        address: location.address,
        distance: distance,
      });
    }
    res.status(200).json({
      message: "Get distance from all locations to user",
      distances: distances,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  updateUserInfo,
  getUserInfo,
  updateAvatar,
  updatePassword,
  forgotPassword,
  getDistanceFromLocation,
};
