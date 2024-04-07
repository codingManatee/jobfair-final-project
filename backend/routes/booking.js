const express = require('express');
const { getBooking, createBooking, deleteBooking, updateBooking, getAllBooking } = require('../controllers/booking');
const router = express.Router();

const { protect , authorization } = require('../middleware/auth')

router.route('/:id').get(protect, getBooking).delete(protect, deleteBooking).put(protect, updateBooking);
router.route('/').post(protect, authorization("admin","user"), createBooking).get(protect, authorization("admin","user"), getAllBooking);

module.exports = router;