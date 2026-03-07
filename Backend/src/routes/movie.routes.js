const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', movieController.getMovieDataCRUD);
router.post('/', upload.single('image'), movieController.createMovieCRUD);
router.put('/:id', upload.single('image'), movieController.updateMovieCRUD);
router.delete('/:id', movieController.deleteMovieCRUD);


module.exports = router;