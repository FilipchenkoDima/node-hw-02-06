const express = require("express");
const { register, login, logout, current } = require("../../controllers/auth");
const { userRegisterValidation } = require("../../middlewares");
const { authMiddleware } = require("../../middlewares/userAuthMidddleware");

const router = express.Router();

router.post("/register", userRegisterValidation, register);
router.post("/login", userRegisterValidation, login);
router.post("/logout", authMiddleware, logout);
router.post("/current", authMiddleware, current);

module.exports = { authRouter: router };
