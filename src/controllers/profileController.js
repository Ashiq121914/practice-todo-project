const profileModel = require("../models/profileModel.js");

// user registration
exports.CreateProfile = async (req, res) => {
  try {
    const reqBody = req.body; // Renamed to better reflect the content
    const newUser = await profileModel.create(reqBody);

    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message || "An error occurred while inserting the user",
    });
  }
};
