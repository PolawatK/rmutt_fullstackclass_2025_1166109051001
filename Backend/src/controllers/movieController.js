const Moviemodel = require('../models/movie.model');
const cloudinary = require('../config/cloudinary');
const { validationResult } = require('express-validator');

// get
exports.getMovieDataCRUD = async (req, res) => {
  try {
    const movies = await Moviemodel.getMovieDataCRUD();

    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Load data failed' });
  }
};

// create
exports.createMovieCRUD = async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  try {

    let imageUrl = null;

    if (req.file) {

      const uploadResult = await new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'movies',
            resource_type: 'image'
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        stream.end(req.file.buffer);

      });

      imageUrl = uploadResult.secure_url;
    }

    const {
      title,
      description,
      duration_minutes,
      release_date,
      director
    } = req.body;

    const movie = await Moviemodel.createMovieCRUD(
      title,
      description,
      duration_minutes,
      release_date,
      director,
      imageUrl
    );

    res.status(201).json(movie);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Create movie failed"
    });

  }

};

// update

exports.updateMovieCRUD = async (req, res) => {
  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { id } = req.params;

    // ดึงข้อมูล movie เดิม
    const existingMovie = await Moviemodel.getMovieById(id);

    if (!existingMovie) {
      return res.status(404).json({
        message: "Movie not found"
      });
    }

    let imageUrl = existingMovie.image_url;




    if (req.file) {

      const uploadResult = await new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'movies',
            resource_type: 'image'
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        stream.end(req.file.buffer);

      });

      imageUrl = uploadResult.secure_url;

    }

    const {
      title,
      description,
      duration_minutes,
      release_date,
      director
    } = req.body;

    const movie = await Moviemodel.updateMovieCRUD(
      id,
      title,
      description,
      duration_minutes,
      release_date,
      director,
      imageUrl
    );

    res.json(movie);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Update movie failed"
    });

  }
};

// delete
exports.deleteMovieCRUD = async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  try {

    const { id } = req.params;

    const existingMovie = await Moviemodel.getMovieById(id);

    if (!existingMovie) {
      return res.status(404).json({
        message: "Movie not found"
      });
    }

    await Moviemodel.deleteMovieCRUD(id);

    res.json({
      message: "Movie deleted"
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Delete movie failed"
    });

  }

};