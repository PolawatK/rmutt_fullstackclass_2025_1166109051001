const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie-details.controller");

router.get("/:id/details", movieController.getMovieDetails);

module.exports = router;