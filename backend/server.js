// backend/server.js (Corrected)

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const storeRoutes = require("./routes/stores");
const app = express();
const PORT = process.env.PORT || 5001;
const adminRoutes = require("./routes/admin");
const ownerRoutes = require("./routes/owner");
const productRoutes = require("./routes/products");

app.use(cors());
app.use(express.json());
app.use("/api/owner", ownerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/products", productRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
