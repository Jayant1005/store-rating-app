const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verifyToken = require("../middleware/verifyToken");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/verify", verifyToken, authController.verifyToken);

module.exports = router;
