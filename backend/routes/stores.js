// backend/routes/stores.js

const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const userId = req.user.id;
  const { name, address } = req.query;

  let query = `
    SELECT
      s.id,
      s.name,
      s.address,
      COALESCE(AVG(r.rating), 0) as "overallRating",
      (SELECT rating FROM ratings WHERE store_id = s.id AND user_id = $1) as "userRating"
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    WHERE 1=1
  `;
  const params = [userId];

  if (name) {
    params.push(`%${name}%`);
    query += ` AND s.name ILIKE $${params.length}`;
  }
  if (address) {
    params.push(`%${address}%`);
    query += ` AND s.address ILIKE $${params.length}`;
  }

  query += " GROUP BY s.id ORDER BY s.name";

  try {
    const storesResult = await db.query(query, params);
    res.json(storesResult.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.post("/:id/ratings", auth, async (req, res) => {
  const { rating } = req.body;
  const storeId = req.params.id;
  const userId = req.user.id;

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5." });
  }

  try {
    const ratingResult = await db.query(
      `INSERT INTO ratings (user_id, store_id, rating)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, store_id) DO UPDATE SET rating = EXCLUDED.rating
       RETURNING *`,
      [userId, storeId, rating]
    );

    res.status(201).json(ratingResult.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id/products", async (req, res) => {
  try {
    const productsResult = await db.query(
      "SELECT id, name, price FROM products WHERE store_id = $1 ORDER BY name",
      [req.params.id]
    );
    res.json(productsResult.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
