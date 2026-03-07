const express = require("express");
const router = express.Router();
const theatercrudController = require("../controllers/theatercrud.controller");

router.post("/add", theatercrudController.addScreen);
router.put("/update/:id", theatercrudController.updateScreen);
router.get("/", theatercrudController.getTheaterScreen);
router.delete("/:id", theatercrudController.deleteScreen);

module.exports = router;