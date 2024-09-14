const express = require("express");
const router = express.Router();

const profileController = require("../controllers/profileController.js");
const authVerify = require("../middleware/authVerify.js");

router.post("/createProfile", profileController.CreateProfile);
router.post("/userLogin", profileController.UserLogin);
router.get("/selectProfile", authVerify, profileController.SelectProfile);

module.exports = router;
