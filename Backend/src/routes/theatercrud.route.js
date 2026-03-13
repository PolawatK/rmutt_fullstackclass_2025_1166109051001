const express = require("express");
const router = express.Router();
const theatercrudController = require("../controllers/theatercrud.controller");
const { authenticateAdmin,authenticateToken } = require('../middleware/authMiddleware');

router.post("/add", authenticateToken,authenticateAdmin,theatercrudController.addScreen);
router.put("/update/:id", authenticateToken,authenticateAdmin,theatercrudController.updateScreen);
router.get("/", authenticateToken,authenticateAdmin,theatercrudController.getTheaterScreen);
router.delete("/:id", authenticateToken,authenticateAdmin,theatercrudController.deleteScreen);

module.exports = router;