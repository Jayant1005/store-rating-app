// backend/routes/admin.js

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../db");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/dashboard", [auth, admin], async (req, res) => {
  try {
    const userCount = await db.query("SELECT COUNT(*) FROM users");
    const storeCount = await db.query("SELECT COUNT(*) FROM stores");
    const ratingCount = await db.query("SELECT COUNT(*) FROM ratings");

    res.json({
      users: parseInt(userCount.rows[0].count),
      stores: parseInt(storeCount.rows[0].count),
      ratings: parseInt(ratingCount.rows[0].count),
    });
  } catch (err) {
    console.error("Error fetching admin dashboard stats:", err.message);
    res.status(500).send("Server Error");
  }
});

// --- POST a New Store ---
router.post("/stores", [auth, admin], async (req, res) => {
  const { name, address, owner_id } = req.body;

  if (!name || !address) {
    return res
      .status(400)
      .json({ message: "Store name and address are required." });
  }

  try {
    const newStore = await db.query(
      "INSERT INTO stores (name, address, owner_id) VALUES ($1, $2, $3) RETURNING *",
      [name, address, owner_id || null]
    );
    res.status(201).json(newStore.rows[0]);
  } catch (err) {
    console.error("Error creating a new store:", err.message);
    res.status(500).send("Server Error");
  }
});

// --- POST a New User ---
router.post("/users", [auth, admin], async (req, res) => {
  const { name, email, password, address, role } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await db.query(
      "INSERT INTO users (name, email, password, address, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role",
      [name, email, hashedPassword, address, role]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    console.error("Error creating a new user:", err.message);
    if (err.code === "23505") {
      return res
        .status(400)
        .json({ message: "An account with this email already exists." });
    }
    res.status(500).send("Server Error");
  }
});

router.get("/users", [auth, admin], async (req, res) => {
  const { name, email, role } = req.query; 

  let query = "SELECT id, name, email, address, role FROM users WHERE 1=1";
  const params = [];

  if (name) {
    params.push(`%${name}%`);
    query += ` AND name ILIKE $${params.length}`;
  }
  if (email) {
    params.push(`%${email}%`);
    query += ` AND email ILIKE $${params.length}`;
  }
  if (role) {
    params.push(role);
    query += ` AND role = $${params.length}`;
  }

  try {
    const users = await db.query(query, params);
    res.json(users.rows);
  } catch (err) {
    console.error("Error fetching users for admin:", err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/stores", [auth, admin], async (req, res) => {
  const { name, address } = req.query; 

  let query = `
    SELECT s.id, s.name, s.address, COALESCE(AVG(r.rating), 0) as "rating"
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    WHERE 1=1
  `;
  const params = [];

  if (name) {
    params.push(`%${name}%`);
    query += ` AND s.name ILIKE $${params.length}`;
  }
  if (address) {
    params.push(`%${address}%`);
    query += ` AND s.address ILIKE $${params.length}`;
  }

  query += " GROUP BY s.id, s.name, s.address ORDER BY s.name";

  try {
    const stores = await db.query(query, params);
    res.json(stores.rows);
  } catch (err) {
    console.error("Error fetching stores for admin:", err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
