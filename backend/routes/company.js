const express = require('express');
const { createCompany, getCompany, updateCompany, deleteCompany } = require('../controllers/company');
const router = express.Router();

const { protect , authorization } = require('../middleware/auth')

router.get('/companies', protect , authorization('admin'), createCompany);
router.route('/companies/:id').get(getCompany).put(protect, authorization('admin'), updateCompany).delete(protect, authorization('admin'), deleteCompany);

module.exports = router;