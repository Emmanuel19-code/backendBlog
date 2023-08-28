const express = require("express");
const { SignUp, VerifyAccount, Login, ForgotPassword, createNewPassword, LogOut } = require("../controllers/Auth");
const router = express.Router();
const upload = require("../utils/ImageUpload");
const { VerifyUser } = require("../middleware/authentication");






router.post("/register",SignUp,upload.single("profilePicture"))
router.post("/user-verification",VerifyUser,VerifyAccount)
router.post("/login",Login)
router.post("/forgotpassword",ForgotPassword)
router.post("/newPassword",VerifyUser,createNewPassword)
router.get("/logOut",LogOut)

module.exports = router