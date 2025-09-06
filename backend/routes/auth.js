// backend/routes/auth.js

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const router = express.Router();
const auth = require("../middleware/auth");

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) =>
  /^(?=.*[A-Z])(?=.*[!@#$&*]).{8,16}$/.test(password);

router.post("/register", async (req, res) => {
  const { name, email, password, address } = req.body;

  if (!name || name.length < 20 || name.length > 60) {
    return res
      .status(400)
      .json({ message: "Name must be between 20 and 60 characters." });
  }
  if (!email || !validateEmail(email)) {
    return res.status(400).json({ message: "A valid email is required." });
  }
  if (!password || !validatePassword(password)) {
    return res.status(400).json({
      message:
        "Password must be 8-16 characters and include an uppercase letter and a special character.",
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await db.query(
      "INSERT INTO users (name, email, password, address) VALUES ($1, $2, $3, $4) RETURNING id, email, role",
      [name, email, hashedPassword, address]
    );
    res
      .status(201)
      .json({ message: "User registered successfully!", user: result.rows[0] });
  } catch (error) {
    if (error.code === "23505") {
      return res
        .status(400)
        .json({ message: "An account with this email already exists." });
    }
    res.status(500).json({ message: "Server error during registration." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const userResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Server Error during login:", error);
    res.status(500).json({ message: "Server error." });
  }
});

router.put("/update-password", auth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    const userResult = await db.query(
      "SELECT password FROM users WHERE id = $1",
      [userId]
    );
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    const storedPassword = userResult.rows[0].password;
    const isMatch = await bcrypt.compare(currentPassword, storedPassword);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect current password." });
    }

    if (!validatePassword(newPassword)) {
      return res.status(400).json({
        message: "New password does not meet complexity requirements.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    await db.query("UPDATE users SET password = $1 WHERE id = $2", [
      hashedNewPassword,
      userId,
    ]);

    res.json({ message: "Password updated successfully." });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/profile", auth, async (req, res) => {
  try {
    const user = await db.query(
      "SELECT name, email, address, role FROM users WHERE id = $1",
      [req.user.id]
    );
    if (user.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
