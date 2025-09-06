// backend/routes/stores.js

const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const storesResult = await db.query(
      `SELECT
        s.id,
        s.name,
        s.address,
        COALESCE(AVG(r.rating), 0) as "overallRating",
        (SELECT rating FROM ratings WHERE store_id = s.id AND user_id = $1) as "userRating"
       FROM stores s
       LEFT JOIN ratings r ON s.id = r.store_id
       GROUP BY s.id
       ORDER BY s.name`,
      [req.user.id]
    );

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

module.exports = router;
