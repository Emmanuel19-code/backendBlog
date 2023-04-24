const express = require("express");
const { SignUp, VerifyAccount, Login, ForgotPassword, createNewPassword, LogOut } = require("../controllers/Auth");
const router = express.Router();
const upload = require("../utils/ImageUpload");
const { VerifyUser } = require("../middleware/authentication");





router.post("/register",upload.single("image"),SignUp)
router.post("/user-verification",VerifyUser,VerifyAccount)
router.post("/login",Login)
router.post("/forgot-password",ForgotPassword)
router.post("/newPassword",VerifyUser,createNewPassword)
router.post("/logOut",LogOut)

module.exports = router