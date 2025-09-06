// backend/routes/products.js

const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");
const owner = require("../middleware/owner");

router.get("/", [auth, owner], async (req, res) => {
  try {
    const storeResult = await db.query(
      "SELECT id FROM stores WHERE owner_id = $1",
      [req.user.id]
    );

    if (storeResult.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Store not found for this owner." });
    }
    const storeId = storeResult.rows[0].id;

    const productsResult = await db.query(
      "SELECT * FROM products WHERE store_id = $1 ORDER BY name",
      [storeId]
    );
    res.json(productsResult.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", [auth, owner], async (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res
      .status(400)
      .json({ message: "Product name and price are required." });
  }

  try {
    const storeResult = await db.query(
      "SELECT id FROM stores WHERE owner_id = $1",
      [req.user.id]
    );

    if (storeResult.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Store not found for this owner." });
    }
    const storeId = storeResult.rows[0].id;

    const newProduct = await db.query(
      "INSERT INTO products (store_id, name, price) VALUES ($1, $2, $3) RETURNING *",
      [storeId, name, price]
    );

    res.status(201).json(newProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
