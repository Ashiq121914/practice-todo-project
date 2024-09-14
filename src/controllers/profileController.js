const ProfileModel = require("../models/profileModel.js");
const profileModel = require("../models/profileModel.js");
const jwt = require("jsonwebtoken");

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

// user login
exports.UserLogin = async (req, res) => {
  try {
    const reqBody = req.body;
    let UserName = reqBody["Username"];
    let Password = req.body["Password"];

    const data = await ProfileModel.find({
      Username: UserName,
      Password: Password,
    });

    if (data.length > 0) {
      let payload = {
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        data: data[0],
      };
      let token = jwt.sign(payload, "SecretKey123456789");

      res.status(201).json({
        status: "success",
        data: data,
        token: token,
      });
    } else {
      res.status(201).json({
        status: "fail",
        data: "unauthorized",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message || "Unauthorized",
    });
  }
};

//
exports.SelectProfile = async (req, res) => {
  try {
    const UserName = req.headers["username"];
    const data = await profileModel.find({ Username: UserName });

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message || "An error occurred while reading the data",
    });
  }
};

//update profile
exports.UpdateProfile = async (req, res) => {
  try {
    const Username = req.headers["username"]; // Retrieving the username from the header
    // console.log(Username);
    const query = { Username: Username }; // Defining the query for finding the user
    const updateData = req.body; // Data to update

    // Corrected updateOne syntax
    const data = await profileModel.updateOne(query, updateData);

    if (data.matchedCount === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No user found with this username",
      });
    }

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message || "An error occurred while updating the data",
    });
  }
};
