const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    bookingDate : {
        type : Date,
        require : true,
    },
    user : {
        type : mongoose.Schema.ObjectId,
        ref : "User",
        require : true,
    },
    company : {
        type : mongoose.Schema.ObjectId,
        ref : "Company",
        require : true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Booking", BookingSchema);