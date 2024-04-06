const express = require('express');
const { createCompany, getCompany, updateCompany } = require('../controllers/company');
const router = express.Router();

const { protect , authorization } = require('../middleware/auth')

router.get('/companies', protect , authorization('admin'), createCompany);
router.route('/companies/:id').get(getCompany).put(protect, authorization('admin'), updateCompany);


module.exports = router;