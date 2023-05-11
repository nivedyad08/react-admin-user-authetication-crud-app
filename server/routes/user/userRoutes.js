const express = require("express");
const userRoute = express();
const userController = require("../../controllers/user/userController");
const checkIsUserAuthenticated = require("../../middlewares/authMiddleware");
const userImageUpload = require("../../config/multer").userImageUpload;

userRoute.post(
  "/update/:userId",
  checkIsUserAuthenticated,
  userImageUpload.single("profilePic"),
  userController.updateUserDetails
);
//Protected Routes
userRoute.post(
  "/change-password/:userId",
  checkIsUserAuthenticated,
  userController.changePassword
);

module.exports = userRoute;
