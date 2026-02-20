const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");
const roleGuard = require("../middleware/roleGuard");

router.put("/profile", verifyToken, userController.updatePassword); // Assuming updatePassword acts as profile update
router.get("/profile", verifyToken, userController.getProfile);

// Admin routes
router.get("/", verifyToken, roleGuard(["System Administrator"]), userController.getUsers);
router.post("/", verifyToken, roleGuard(["System Administrator"]), userController.createUser);
router.get("/dashboard", verifyToken, roleGuard(["System Administrator"]), userController.getAdminDashboardStats);

module.exports = router;
