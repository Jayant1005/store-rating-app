// backend/routes/owner.js

const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");
const owner = require("../middleware/owner");

// --- Endpoint: Get Store Owner's Dashboard Data ---
// @route   GET /api/owner/dashboard
// @access  Owner
router.get("/dashboard", [auth, owner], async (req, res) => {
  try {
    // Find the store owned by the logged-in user
    const storeResult = await db.query(
      "SELECT * FROM stores WHERE owner_id = $1",
      [req.user.id]
    );

    if (storeResult.rows.length === 0) {
      return res.status(404).json({ message: "You do not own a store." });
    }

    const store = storeResult.rows[0];

    // Get the average rating for the store
    const avgRatingResult = await db.query(
      'SELECT COALESCE(AVG(rating), 0) as "averageRating" FROM ratings WHERE store_id = $1',
      [store.id]
    );

    // Get the list of users who have rated the store
    const ratersResult = await db.query(
      `SELECT u.name, u.email, r.rating
       FROM ratings r
       JOIN users u ON r.user_id = u.id
       WHERE r.store_id = $1`,
      [store.id]
    );

    res.json({
      storeName: store.name,
      averageRating: parseFloat(avgRatingResult.rows[0].averageRating).toFixed(
        2
      ),
      raters: ratersResult.rows,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
