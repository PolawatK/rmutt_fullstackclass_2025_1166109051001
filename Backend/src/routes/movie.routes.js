const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const { authenticateToken } = require('../middleware/authMiddleware');
const { body, param } = require('express-validator');

router.get('/',authenticateToken, movieController.getMovieDataCRUD);

router.post(
  '/',
  authenticateToken,
  upload.single('image'),

  [
    body('title').notEmpty(),
    body('duration_minutes').isInt({ min: 1 }),
    body('release_date').optional().isDate()
  ],

  movieController.createMovieCRUD
);

router.put(
  '/:id',
  authenticateToken,
  upload.single('image'),

  [
    param('id').isInt(),
    body('title').optional().notEmpty(),
    body('duration_minutes').optional().isInt({ min: 1 }),
    body('release_date').optional().isDate()
  ],

  movieController.updateMovieCRUD
);

router.delete(
  '/:id',
  authenticateToken,
  [
    param('id').isInt()
  ],
  movieController.deleteMovieCRUD
);


module.exports = router;
