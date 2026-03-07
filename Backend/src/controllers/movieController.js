const Moviemodel = require('../models/movie.model');
const cloudinary = require('../config/cloudinary');

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

    const { id } = req.params;

    let imageUrl = req.body.image_url || null;

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

  try {

    const { id } = req.params;

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