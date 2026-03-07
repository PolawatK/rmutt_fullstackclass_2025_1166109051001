const showtimeModel = require('../models/showtime.model');

exports.createShowtime = async (req, res) => {

  try{
    const { movie_id, screen_id, start_time, price } = req.body;

    const showtime = await showtimeModel.createShowtime(
      movie_id,
      screen_id,
      start_time,
      price
    );

    res.json(showtime);

  } catch (error){
    res.status(400).json({message:error.message});
  }
};

exports.getAllShowtimes = async (req, res) => {

  try{

    const showtimes = await showtimeModel.getAllShowtimes();

    res.json(showtimes);

  }catch(err){

    res.status(500).json({error:err.message});

  }

};

exports.getShowtimeById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await showtimeModel.findById(id);
    if (!data) {
      return res.status(404).json({ message: 'Showtime not found' });
    }
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBookedSeats = async (req, res) => {
  try {
    const { id } = req.params;
    const seats = await showtimeModel.findBookedSeats(id);
    res.json(seats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};