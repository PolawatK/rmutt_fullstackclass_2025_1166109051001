const express = require('express');
const router = express.Router();
const theaterController = require('../controllers/theatercrud.controller');

router.get('/', theaterController.getTheaterScreen);
router.post('/add', theaterController.addScreen);
router.put("/update/:id", theaterController.updateScreen);

module.exports = router;