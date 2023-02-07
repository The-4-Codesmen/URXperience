const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, calllback) => {
    calllback(null, "./client/public/uploads/");
  },
  filename: (req, file, calllback) => {
    calllback(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
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
  deleteGroupChatController,
  addEventController,
  findEventController,
  deleteEventController,
  findEventAllController,
  findEventByIdController,
  findEventforDashboardController,
  complaintPostController,
  getComplaintController,
  deleteComplaintController,
} = require("../controllers/authcontroller.js");

router.post("/register", validRegister, registerController);
router.post("/login", validLogin, loginController);
router.post("/activation", activationController);
router.put("/forgotpassword", forgotPasswordValidator, forgotController);
router.put("/resetpassword", resetPasswordValidator, resetController);
router.get("/user/:id", requireSignin, readController);
router.put("/user/update", requireSignin, updateController);

// event routes
router.post("/postevent", addEventController);
router.post("/eventfind", findEventController);
router.post("/eventdelete", deleteEventController);
router.post("/eventfindbyid", findEventByIdController);
router.get("/eventfindall", findEventAllController);
router.get("/dashboardevent", findEventforDashboardController);

//get all members
router.get("/allUsers", retrieveAllContorller);

//load rooms
router.get("/rooms", roomController);

router.post("/groupRooms", groupRoomController);
router.get("/groupChatArr", getAllGroupChat);

router.delete("/logout", ensureUserExist, LogoutController);
router.post("/deletegroup", deleteGroupChatController);

//delete user account
router.delete("/delete", ensureUserExist, deleteController);

//complaint box
router.post("/complaintbox", upload.single("image"), complaintPostController);
router.get("/getcomplaints", getComplaintController);
router.post("/deletecomplaints", deleteComplaintController);

module.exports = router;
