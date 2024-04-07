const express = require('express');
const { getBooking, createBooking, deleteBooking } = require('../controllers/booking');
const router = express.Router();

const { protect , authorization } = require('../middleware/auth')

router.route('/:id').get(protect, getBooking).delete(protect, authorization("admin"), deleteBooking);
router.route('/').post(protect, authorization("admin","user"), createBooking);

module.exports = router;