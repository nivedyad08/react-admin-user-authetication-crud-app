const User = require("../../models/usersMdl");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//User Details Edit
const updateUserDetails = async (req, res) => {
  const { name, phone } = req.body;
  const { profilePic } = req.user;
  const userId = req.userId;
  try {
    if (!userId) {
      return res.status(400).json({ message: "Invalid user" });
    }
    let imageName = "";
    if (req.file) {
      imageName = req.file.filename;
    } else {
      imageName = req.body.profilePic;
    }
    const userUpdate = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { name, phone, profilePic: imageName } },
      { new: true }
    );
    if (!userUpdate) {
      return res.status(400).json({ message: "Something went wrong" });
    }
    return res.status(200).json({ message: "User updated successfully !!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Change Password
const changePassword = async (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  try {
    if (newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        const hashPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(req.user._id, {
          password: hashPassword,
        });
        return res
          .status(200)
          .json({ message: "Password updated successfuly" });
      } else {
        return res
          .status(400)
          .json({ message: "password and confirm password does not match" });
      }
    } else {
      return res.status(400).json({ message: "All fields are required !!" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  updateUserDetails,
  changePassword,
};
