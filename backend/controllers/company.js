const { response } = require('express');
const Company = require('../models/Company');

// @desc    Create a company
// @route   POST /api/v1/companies
// @access  Private
exports.createCompany = async (req,res,next) => {
    try {
        const company = await Company.create(req.body);
        res.status(201).json({ success : true , data : company });
    } catch (err) {
        res.status(400).json({ success : false , err });
    }
};

// @desc    Get all companies
// @route   GET /api/v1/companies
// @access  Public


// @desc    Get a company
// @route   GET /api/v1/companies/:id
// @access  Public
exports.getCompany = async (req,res,next) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(400).json({ success : false , message : "Company does not exists"});
        }
        res.status(200).json({ success : true , data : company });
    } catch (err) {
        res.status(400).json({ success : false });
    }
};

// @desc    Update a company
// @route   PUT /api/v1/companies/:id
// @access  Private
exports.updateCompany = async (req,res,next) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!company) {
            return res.status(400).json({ success : false , message : "Company does not exists"});
        }
        res.status(200).json({ success : true , data : company });
    } catch (err) {
        res.status(400).json({ success : false });
    }
};

// @desc    Delete a company
// @route   DELETE /api/v1/companies/:id
// @access  Private
exports.deleteCompany = async (req,res,next) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(400).json({ success : false , message : "Company does not exists"});
        }
        await Company.findByIdAndDelete(req.params.id);
        res.status(200).json({ success : true , data : {}});
    } catch (err) {
        console.log(err)
        res.status(400).json({ success : false });
    }
}