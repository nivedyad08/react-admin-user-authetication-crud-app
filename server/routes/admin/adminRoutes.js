const express = require("express");
const adminRoute = express();
const adminController = require("../../controllers/admin/adminController");
const checkIsUserAuthenticated = require("../../middlewares/authMiddleware");
const userImageUpload = require("../../config/multer").userImageUpload;

adminRoute.get(
    "/users",
    checkIsUserAuthenticated,
    adminController.users
  );
  adminRoute.get(
    "/users/details/:userId",
    checkIsUserAuthenticated,
    adminController.userDetails
  );
adminRoute.post(
  "/create/user",
  checkIsUserAuthenticated,
  adminController.createUser
);
adminRoute.put(
  "/delete/user/:userId",
  checkIsUserAuthenticated,
  adminController.deleteUser
);
adminRoute.put("/change-user-status/:userId",checkIsUserAuthenticated, adminController.blockUser);
adminRoute.post(
  "/edit/user/:userId",
  checkIsUserAuthenticated,
  userImageUpload.single("profilePic"),
  adminController.editUser
);

module.exports = adminRoute;
