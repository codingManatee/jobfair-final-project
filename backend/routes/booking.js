const express = require('express');
const { } = require('../controllers/booking');
const router = express.Router();

const { protect , authorization } = require('../middleware/auth')


module.exports = router;