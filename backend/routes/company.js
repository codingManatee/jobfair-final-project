const express = require('express');
const { createCompany } = require('../controllers/company');
const router = express.Router();

const { protect , authorization } = require('../middleware/auth')

router.get('/companies', protect , authorization('admin'), createCompany);

module.exports = router;