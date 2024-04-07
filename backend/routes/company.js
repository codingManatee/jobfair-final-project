const express = require('express');
const { createCompany, getCompany, updateCompany, deleteCompany, getAllCompany } = require('../controllers/company');
const bookingRouter = require('./booking')
const router = express.Router();

const { protect , authorization } = require('../middleware/auth')

router.route('/').post(protect , authorization('admin'), createCompany).get(getAllCompany);
router.route('/:id').get(getCompany).put(protect, authorization('admin'), updateCompany).delete(protect, authorization('admin'), deleteCompany);

router.use('/:companyId/booking', bookingRouter);


module.exports = router;