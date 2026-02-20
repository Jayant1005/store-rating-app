const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const verifyToken = require("../middleware/verifyToken");
const roleGuard = require("../middleware/roleGuard");

// CRUD for products, tied to a specific store_id.
// Owner manages their store's products
router.get("/", verifyToken, roleGuard(["Store Owner"]), productController.getOwnerProducts);
router.post("/", verifyToken, roleGuard(["Store Owner"]), productController.createProduct);
router.put("/:id", verifyToken, roleGuard(["Store Owner"]), productController.updateProduct);
router.delete("/:id", verifyToken, roleGuard(["Store Owner"]), productController.deleteProduct);

// Public access to a store's products
router.get("/store/:storeId", productController.getStoreProducts);

module.exports = router;
