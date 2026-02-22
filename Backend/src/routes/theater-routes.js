const express = require('express');
const router = express.Router();
const theaterController = require('../controllers/theater-controller');


router.get('/', theaterController.getshowtime);

module.exports = router;