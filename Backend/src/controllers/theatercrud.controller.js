const theatercrudmodel = require("../models/theatercrud.model");

//เพิ่มโรงหนัง
exports.addScreen = async (req, res) => {
  try {
    const { name, location, amenities, rows, seatsPerRow } = req.body;
    if (!name || !location || !rows || !seatsPerRow) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    const screen = await theatercrudmodel.createScreen(
      name,
      location,
      amenities,
    );

    const screenId = screen.id;
    const rowLabels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (rows > rowLabels.length) {
      return res.status(400).json({
        error: "Rows cannot exceed 26",
      });
    }

    for (let r = 0; r < rows; r++) {
      const row = rowLabels[r];
      for (let s = 1; s <= seatsPerRow; s++) {
        let type = "Normal";
        if (r >= rows - 2) {
          type = "VIP";
        } else if (r >= rows - 4) {
          type = "Premium";
        }
        await theatercrudmodel.createSeat(screenId, row, s, type);
      }
    }

    res.json({
      message: "Screen created",
      screenId: screenId,
    });
  } catch (err) {
    console.error("ADD SCREEN ERROR:", err);

    res.status(500).json({
      error: err.message,
    });
  }
};

// อัปเดทโรงหนัง(ข้อมูล)
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

// โรงหนังมาจาก data
exports.getTheaterScreen = async (req, res) => {
  try {
    const theatershowtime = await theatercrudmodel.getTheaterScreen();

    res.json(theatershowtime);
  } catch (err) {
    console.error("GET SCREEN ERROR:", err);

    res.status(500).json({
      message: "Load data failed",
    });
  }
};

//ลบตัวโรงหนัง
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
