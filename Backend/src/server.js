require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const dashboardRoutes = require('./routes/dashboard-routes');
const theaterRoutes = require('./routes/theater-routes');
const app = express();
const cors = require('cors');
const showtimeRoutes = require('./routes/showtime.routes');
const screenRoutes = require('./routes/screen.routes');
const reviewRoutes = require('./routes/review-routes');
const customerRoutes = require('./routes/customers-routes');
const bookingRoutes = require('./routes/booking.routes');
const bookingRoute = require('./routes/bookingcrud.route');
const theatercrudRoutes = require('./routes/theatercrud.route');
app.use(cors());
app.use(express.json());


const port = process.env.PORT || 5050;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use('/api/bookings', bookingRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/theaters', theaterRoutes);
app.use('/api/showtimes', showtimeRoutes);
app.use('/api/screens', screenRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/bookingcrud', bookingRoute);

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
