const express = require("express");
const {
  register,
  login,
  logout,
  current,
  avatars,
  verifyEmail,
  resendEmail,
} = require("../../controllers/auth");
const {
  userRegisterValidation,
  upload,
  verifyMiddleware,
} = require("../../middlewares");
const { authMiddleware } = require("../../middlewares/userAuthMidddleware");

const router = express.Router();

router.post("/register", userRegisterValidation, register);
router.post("/login", userRegisterValidation, login);
router.post("/logout", authMiddleware, logout);
router.post("/current", authMiddleware, current);
router.patch("/avatars", authMiddleware, upload.single("avatars"), avatars);
router.get("/verify/:verificationToken", verifyEmail);
router.post("/verify", verifyMiddleware, resendEmail);

module.exports = { authRouter: router };
