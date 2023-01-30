const express = require("express");
const router = express.Router();

//validation
const {
  validRegister,
  validLogin,
  forgotPasswordValidator,
  resetPasswordValidator,
  requireSignin,
  ensureUserExist,
} = require("../helpers/valid");

//Load controllers
const {
  registerController,
  activationController,
  loginController,
  forgotController,
  resetController,
  updateController,
  readController,
  roomController,
  LogoutController,
  deleteController,
  retrieveAllContorller,
  groupRoomController,
  getAllGroupChat,
  deleteGroupChatController
} = require("../controllers/authcontroller.js");

router.post("/register", validRegister, registerController)
router.post("/login", validLogin, loginController);
router.post("/activation", activationController);
router.put("/forgotpassword", forgotPasswordValidator, forgotController);
router.put("/resetpassword", resetPasswordValidator, resetController);
router.get("/user/:id", requireSignin, readController);
router.put("/user/update", requireSignin, updateController);

//get all members
router.get("/allUsers", retrieveAllContorller);

//load rooms
router.get("/rooms", roomController);

router.post("/groupRooms", groupRoomController);
router.get("/groupChatArr", getAllGroupChat)

router.delete("/logout", ensureUserExist, LogoutController);
router.post("/deletegroup",  deleteGroupChatController);

//delete user account
router.delete("/delete", ensureUserExist, deleteController);
module.exports = router;
