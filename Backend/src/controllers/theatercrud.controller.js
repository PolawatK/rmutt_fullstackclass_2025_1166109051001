const pool = require("../config/db");
const theatercrudmodel = require("../models/theatercrud.model");

//เพิ่มโรงหนัง
exports.addScreen = async (req, res) => {
  const client = await pool.connect();
  try {
    const { name, location, amenities, rows, seatsPerRow } = req.body;
    if (!name || !location || !rows || !seatsPerRow) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }
    const rowLabels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (rows > rowLabels.length) {
      return res.status(400).json({
        error: "Rows cannot exceed 26",
      });
    }
    await client.query("BEGIN");
    const screen = await theatercrudmodel.createScreen(
      client,
      name,
      location,
      amenities,
    );

    const screenId = screen.id;
    for (let r = 0; r < rows; r++) {
      const row = rowLabels[r];

      for (let s = 1; s <= seatsPerRow; s++) {
        console.log("Seat type:", "Normal");
        await theatercrudmodel.createSeat(client, screenId, row, s, "Normal");
      }
    }
    await client.query("COMMIT");

    res.json({
      message: "Screen created successfully",
      screenId: screenId,
    });
  } catch (err) {
    console.error("ADD SCREEN ERROR:", err);
    await client.query("ROLLBACK");
    res.status(500).json({
      error: "Create screen failed",
    });
  } finally {
    client.release();
  }
};

// อัปเดตโรงหนัง
exports.updateScreen = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, amenities } = req.body;
    const updated = await theatercrudmodel.updateScreen(
      id,
      name,
      location,
      amenities,
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Update failed",
    });
  }
};

// ดึงข้อมูลโรงหนัง
exports.getTheaterScreen = async (req, res) => {
  try {
    const screens = await theatercrudmodel.getTheaterScreen();
    res.json(screens);
  } catch (err) {
    console.error("GET SCREEN ERROR:", err);
    res.status(500).json({
      message: "Load data failed",
    });
  }
};

// ลบโรงหนัง
exports.deleteScreen = async (req, res) => {
  try {
    const { id } = req.params;
    const hasShowtime = await theatercrudmodel.checkShowtime(id);
    if (hasShowtime) {
      return res.status(400).json({
        message: "This movie theater is still in use.",
      });
    }
    await theatercrudmodel.deleteSeatsByScreen(id);
    await theatercrudmodel.deleteScreen(id);
    res.json({
      message: "The movie theater has been successfully removed.",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to delete",
    });
  }
};
