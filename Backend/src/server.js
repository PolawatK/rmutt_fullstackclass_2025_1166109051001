require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const dashboardRoutes = require('./routes/dashboard-routes');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5050;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use('/api/dashboard', dashboardRoutes);

pool.query("SELECT 1")
  .then(() => console.log("✅ Database connected"))
  .catch(err => console.error("❌ DB Error:", err.message));

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "DB Connected" });
  } catch (err) {
    res.status(500).json({ status: "DB Error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
