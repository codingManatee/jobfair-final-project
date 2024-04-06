const express = require('express');
const { createCompany, getCompany } = require('../controllers/company');
const router = express.Router();

const { protect , authorization } = require('../middleware/auth')

router.get('/companies', protect , authorization('admin'), createCompany);
router.get('/companies/:id' , getCompany);

module.exports = router;