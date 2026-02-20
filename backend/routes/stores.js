const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");
const verifyToken = require("../middleware/verifyToken");
const roleGuard = require("../middleware/roleGuard");
const optionalAuth = require("../middleware/optionalAuth");

// Public route to fetch all stores (allows optional auth to fetch user-specific rating)
router.get("/", optionalAuth, storeController.getStores);

// Protected routes for store owner
router.get("/dashboard", verifyToken, roleGuard(["Store Owner"]), storeController.getOwnerDashboard);
router.put("/:id", verifyToken, roleGuard(["Store Owner", "System Administrator"]), storeController.updateStore);

// Admin route
router.post("/", verifyToken, roleGuard(["System Administrator"]), storeController.createStore);

module.exports = router;
