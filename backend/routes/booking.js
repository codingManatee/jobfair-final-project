const express = require('express');
const { getBooking, createBooking } = require('../controllers/booking');
const router = express.Router();

const { protect , authorization } = require('../middleware/auth')

router.route('/booking/:id').get(getBooking);
router.route('/booking').post(protect, createBooking);

module.exports = router;