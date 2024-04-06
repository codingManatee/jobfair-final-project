const express = require('express');
const { createCompany, getCompany, updateCompany, deleteCompany, getAllCompany } = require('../controllers/company');
const router = express.Router();

const { protect , authorization } = require('../middleware/auth')

router.route('/companies').post(protect , authorization('admin'), createCompany).get(getAllCompany);
router.route('/companies/:id').get(getCompany).put(protect, authorization('admin'), updateCompany).delete(protect, authorization('admin'), deleteCompany);

module.exports = router;