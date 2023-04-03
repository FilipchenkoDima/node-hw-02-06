const express = require("express");
const { register, login, logout, current, avatars } = require("../../controllers/auth");
const { userRegisterValidation, upload } = require("../../middlewares");
const { authMiddleware } = require("../../middlewares/userAuthMidddleware");


const router = express.Router();

router.post("/register", userRegisterValidation, register);
router.post("/login", userRegisterValidation, login);
router.post("/logout", authMiddleware, logout);
router.post("/current", authMiddleware, current);
router.patch("/avatars", authMiddleware, upload.single("avatars"), avatars);

module.exports = { authRouter: router };
