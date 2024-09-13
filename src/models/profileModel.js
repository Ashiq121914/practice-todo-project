const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    FirstName: { type: String },
    LastName: { type: String },
    EmailAddress: { type: String },
    MobileNumber: { type: String },
    City: { type: String },
    Username: { type: String },
    Password: { type: String },
  },
  { versionKey: false }
);

const ProfileModel = mongoose.model("profiles", DataSchema);

module.exports = ProfileModel;
