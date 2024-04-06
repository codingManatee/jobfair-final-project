const Booking = require('../models/Booking')


// @desc    Get a booking 
// @route   GET /api/v1/booking/:id
// @access  Private
exports.getBooking = async (req,res,next) => {
    let booking;
    try {
        booking = await Booking.findById(req.params.id).populate({
            path : "Company",
            select : "name address tel"
        });
        if (!booking) {
            return res.status(400).json({ success : false , message : `No booking with the id of ${req.parms.id}`});
        }
        if (booking.user.toString() !== req.user.id && req.user.role !== "admin"){
            return res.status(401).json({ success : false , message : `User ${req.user.id} is not authorized to view this booking`});
        }
        res.status(200).json({ success : true , data : booking });
    } catch (err) {
        console.log(err)
        res.status(400).json({ success : false });
    }
}

// @desc    Create a booking
// @route   POST /api/v1/booking
// @access  Public
exports.createBooking = async (req,res,next) => {
    
}