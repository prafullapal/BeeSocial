const express = require("express");
const authCtrl = require("../controllers/auth.controller");

const router = express.Router();

const { authenticateUser } = require("../helpers/authentication");

router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);
router.get("/logout", authenticateUser, authCtrl.logout);
router.post("/verify-email", authCtrl.verifyEmail);
router.post("/reset-password", authCtrl.resetPassword);
router.post("/forgot-password", authCtrl.forgotPassword);

module.exports = router;
