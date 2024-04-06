const Company = require('../models/Company');

// @desc    Create a company
// @route   POST /api/v1/companies
// @access  Private
exports.createCompany = async (req,res,next) => {
    console.log(req.body);
    try {
        const company = await Company.create(req.body);
        res.status(201).json({ success : true , data : company });
    } catch (err) {
        res.status(400).json({ success : false , err });
    }
}
