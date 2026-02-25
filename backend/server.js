// backend/server.js

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bcrypt = require('bcryptjs');
const pool = require('./db');

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const storeRoutes = require("./routes/stores");
const productRoutes = require("./routes/products");
const reviewRoutes = require("./routes/reviews");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);

const seedSuperAdmin = async () => {
  const email = process.env.SUPER_ADMIN_EMAIL;
  const password = process.env.SUPER_ADMIN_PASSWORD;

  if (!email || !password) {
    console.log('Super Admin credentials not provided in .env, skipping seeding.');
    return;
  }

  try {
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length === 0) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await pool.query(
        'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)',
        ['Super Admin', email, hashedPassword, 'super-admin']
      );
      console.log('Super Admin account created successfully.');
    } else {
      console.log('Super Admin account already exists.');
    }
  } catch (error) {
    console.error('Error seeding Super Admin:', error.message);
  }
};

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await seedSuperAdmin();
});
