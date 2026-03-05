const bookingService = require('../services/bookingcrud.service');

exports.getAll = async (req, res) => {
    try {
        const data = await bookingService.getAllBookings();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};