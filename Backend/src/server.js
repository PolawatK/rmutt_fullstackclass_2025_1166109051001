require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

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

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./routes/account.routes'));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
