const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const { authenticateAdmin } = require('../middleware/authMiddleware');
const { body, param } = require('express-validator');

router.get('/',authenticateAdmin, movieController.getMovieDataCRUD);

router.post(
  '/',
  authenticateAdmin,
  upload.single('image'),

  [
    body('title').notEmpty(),
    body('duration_minutes').isInt({ min: 1 }),
    body('release_date').optional().isDate()
  ],

  movieController.createMovieCRUD
);

router.patch(
  '/:id',
  authenticateAdmin,
  upload.single('image'),

  [
    param('id').isUUID(),
    body('title').optional().notEmpty(),
    body('duration_minutes').optional().isInt({ min: 1 }),
    body('release_date').optional().isDate()
  ],

  movieController.updateMovieCRUD
);

router.delete(
  '/:id',
  authenticateAdmin,
  [
    param('id').isUUID()
  ],
  movieController.deleteMovieCRUD
);


module.exports = router;
