const express = require("express");
const router = express.Router();

const profileController = require("../controllers/profileController.js");

router.post("/createProfile", profileController.CreateProfile);

module.exports = router;
