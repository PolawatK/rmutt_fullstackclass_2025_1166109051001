const express = require("express");
const router = express.Router();
const theatercrudController = require("../controllers/theatercrud.controller");
const { authenticateAdmin } = require('../middleware/authMiddleware');

router.post("/add", authenticateAdmin,theatercrudController.addScreen);
router.put("/update/:id", authenticateAdmin,theatercrudController.updateScreen);
router.get("/", authenticateAdmin,theatercrudController.getTheaterScreen);
router.delete("/:id", authenticateAdmin,theatercrudController.deleteScreen);

module.exports = router;