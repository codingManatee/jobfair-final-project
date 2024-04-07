const Booking = require('../models/Booking');
const Company = require('../models/Company');
const User = require('../models/User');

// @desc    Get ALL booking
// @route   GET /api/v1/booking
// @access  Private
exports.getAllBooking = async (req,res,next) => {
    let query;
    let companyId = req.query["CompanyId"];
    if (req.user.role !== "admin") {
        if (companyId) {
            query = Booking.find({ user: req.user.id , company: companyId}).populate({ path : "company", select : "name address telephone"});
        } else {
            query = Booking.find({ user : req.user.id }).populate({ path : "company", select : "name address telephone"});
        }
    } else {
        if (companyId) {
            query = Booking.find({ company : companyId }).populate({ path : "company", select : "name address telephone"});
        } else {
            query = Booking.find({ }).populate({ path : "company", select : "name address telephone"});
        }
    }
    try {
        const booking = await query;
        return res.status(200).json({ success : true , count : booking.length , data : booking });
    } catch (err) {
        return res.status(400).json({ success : false , message : "Cannot find any booking"});
    }
}


// @desc    Get a booking 
// @route   GET /api/v1/booking/:id
// @access  Private
exports.getBooking = async (req,res,next) => {
    let booking;
    try {
        booking = await Booking.findById(req.params.id).populate({
            path : "company",
            select : "name address telephone"
        });
        if (!booking) {
            return res.status(400).json({ success : false , message : `No booking with the id of ${req.params.id}`});
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
// @route   POST /api/v1/companies/:companyId/bookings
// @access  Private
exports.createBooking = async (req,res,next) => {
    try {
        const company = await Company.findById(req.params.companyId);
        if (!company) {
            return res.status(400).json({ success : false , message : "Company does not exists"});
        }

        const existedBookings = await Booking.find({ user : req.user.id });

        if (existedBookings >= 3) {
            return res.status(400).json({ success : false , message : "Cannot create more than 3 bookings"});
        }

        const booking = Booking.create(req.body);
        if (!booking) {
            return res.status(400).json({ success : false , message : "Cannot create booking"});
        }
        res.status(201).json({ success : true , data : booking });
    } catch (err) {
        res.status(400).json({ success : false })
    }
}

// @desc    Update a booking
// @route   UPDATE /api/v1/booking/:id
// @access  Private
exports.updateBooking = async (req,res,next) => {
    try {
        let booking = Booking.findById(req.params.id);
        if (!booking) {
            return res.status(400).json({ success : false , message : "Booking does not exists"});
        }
        if (booking.user.toString() !== req.user.id || req.user.role !== "admin") {
            return res.status(400).json({ success : false , message : `User ${req.user.id} is not authorized to update this booking`});
        }
        booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
            new : true,
            runValidators : true,
        })
        res.status(200).json({ success : true , data : booking });
    } catch (err) {
        res.status(400).json({ success : false });
    }
}

// @desc    Delete a booking
// @route   DELETE /api/v1/booking/:id
// @access  Private
exports.deleteBooking = async (req,res,next) => {
    try {
        const booking = Booking.findById(req.params.id);
        console.log(booking);
        if (!booking) {
            return res.status(400).json({ success : false , message : "Booking does not exists"})
        }
        await Booking.findByIdAndDelete(req.params.id);
        res.status(200).json({ success : true , message : "Booking has been deleted"});
    } catch (err) {
        res.status(400).json({ success : false })
    }
}