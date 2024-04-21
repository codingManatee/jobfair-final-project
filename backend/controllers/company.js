const { response } = require("express");
const Company = require("../models/Company");

// @desc    Create a company
// @route   POST /api/v1/companies
// @access  Private
exports.createCompany = async (req, res, next) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json({ success: true, data: company });
  } catch (err) {
    res.status(400).json({ success: false, err });
  }
};

// @desc    Get all companies
// @route   GET /api/v1/companies
// @access  Public

exports.getAllCompany = async (req, res, next) => {
  let query;
  const reqQuery = { ...req.query };
  const removeFields = ["select", "sort", "page", "limit"];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create String Query
  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Attempt to parse the query string for MongoDB
  let parsedQueryStr;
  try {
    parsedQueryStr = JSON.parse(queryStr);
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid query syntax", err });
  }

  query = Company.find(parsedQueryStr);

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  try {
    const total = await Company.countDocuments(parsedQueryStr);
    query = query.skip(startIndex).limit(limit);

    // Executing query
    const company = await query;
    // Pagination result
    const pagination = {};
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.status(200).json({
      success: true,
      count: company.length,
      pagination,
      data: company,
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Error retrieving companies", err });
  }
};

// @desc    Get a company
// @route   GET /api/v1/companies/:id
// @access  Public
exports.getCompany = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res
        .status(400)
        .json({ success: false, message: "Company does not exists" });
    }
    res.status(200).json({ success: true, data: company });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Update a company
// @route   PUT /api/v1/companies/:id
// @access  Private
exports.updateCompany = async (req, res, next) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!company) {
      return res
        .status(400)
        .json({ success: false, message: "Company does not exists" });
    }
    res.status(200).json({ success: true, data: company });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Delete a company
// @route   DELETE /api/v1/companies/:id
// @access  Private
exports.deleteCompany = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res
        .status(400)
        .json({ success: false, message: "Company does not exists" });
    }
    await Company.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
};
