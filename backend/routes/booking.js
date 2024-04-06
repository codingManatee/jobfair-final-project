const express = require('express');
const { getBooking } = require('../controllers/booking');
const router = express.Router();

const { protect , authorization } = require('../middleware/auth')

router.route('/booking/:id').get(getBooking);

module.exports = router;