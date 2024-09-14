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
    let UserName = reqBody["UserName"];
    let Password = req.body["Password"];

    const data = await ProfileModel.find({
      UserName: UserName,
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
    const data = await profileModel.find({ UserName: UserName });

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
