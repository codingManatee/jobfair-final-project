const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
      trim: true,
      maxlength: [40, "Company name cannot be longer than 40"],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    website: {
      type: String,
      required: [true, "Please add website URL"],
    },
    description: {
      type: String,
      required: false,
    },
    telephone: {
      type: String,
      required: [true, "Please add telephone number"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Company", CompanySchema);
