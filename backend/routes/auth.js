// backend/routes/auth.js

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const router = express.Router();

// --- Form Validation Helpers ---
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) =>
  /^(?=.*[A-Z])(?=.*[!@#$&*]).{8,16}$/.test(password);

// --- API Endpoint: POST /api/auth/register ---
router.post("/register", async (req, res) => {
  const { name, email, password, address } = req.body;

  // Log the incoming data to see what the server is receiving
  console.log("Received registration request with data:", req.body);

  // Server-side validation with clear logs
  if (!name || name.length < 20 || name.length > 60) {
    console.error("Validation Error: Name length is incorrect.");
    return res
      .status(400)
      .json({ message: "Name must be between 20 and 60 characters." });
  }
  if (!email || !validateEmail(email)) {
    console.error("Validation Error: Email format is invalid.");
    return res.status(400).json({ message: "A valid email is required." });
  }
  if (!password || !validatePassword(password)) {
    console.error(
      "Validation Error: Password does not meet complexity requirements."
    );
    return res.status(400).json({
      message:
        "Password must be 8-16 characters and include an uppercase letter and a special character.",
    });
  }

  try {
    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert the new user into the database
    const result = await db.query(
      "INSERT INTO users (name, email, password, address) VALUES ($1, $2, $3, $4) RETURNING id, email, role",
      [name, email, hashedPassword, address]
    );

    console.log("User successfully registered:", result.rows[0]);
    res
      .status(201)
      .json({ message: "User registered successfully!", user: result.rows[0] });
  } catch (error) {
    console.error("Database Error during registration:", error);
    // Handle unique constraint violation for email
    if (error.code === "23505") {
      return res
        .status(400)
        .json({ message: "An account with this email already exists." });
    }
    // For any other database errors, send a generic 500 error
    res.status(500).json({ message: "Server error during registration." });
  }
});

// --- API Endpoint: POST /api/auth/login ---
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    // Step 1: Find the user by email
    const userResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    // Step 2: If no user is found, send a 401 error immediately
    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const user = userResult.rows[0];

    // Step 3: Compare the submitted password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Step 4: If everything matches, create and send the token
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

module.exports = router;
