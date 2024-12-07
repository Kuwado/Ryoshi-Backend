const { where } = require("sequelize");
const db = require("../models/index");
const createUser = async (userData) => {
  try {
    const existingUser = await db.User.findOne({
      where: { email: userData.email },
    });
    if (existingUser) {
      return {
        message: "Email already existed",
      };
    }

    const user = await db.User.create(userData);
    return user;
  } catch (error) {
    throw error;
  }
};

const checkUserExist = async (userData) => {
  const existedUser = await db.User.findOne({
    where: { email: userData.email },
  });
  return existedUser;
};
const saveUser = async (user, otp, expireTime = 10 * 60 * 1000) => {
  try {
    user.resetPasswordToken = otp;
    user.resetPasswordExpire = Date.now() + expireTime; 
    await user.save();
  } catch (error) {
    console.error("Error saving user:", error);
    throw error; 
  }
};

const updatePassword = async (email, hashedPassword) => {
  try {
    await db.User.update(
      { password: hashedPassword }, // New hashed password
      { where: { email: email } }   // Condition to find the user by email
    );
  } catch (error) {
    console.error("Error updating password:", error); // Log any error during the update process
    throw error; // Throw error for further handling
  }
};



module.exports = { createUser, checkUserExist,saveUser, updatePassword };
