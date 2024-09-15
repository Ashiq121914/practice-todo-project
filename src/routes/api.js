const express = require("express");
const router = express.Router();

const profileController = require("../controllers/profileController.js");
const todoController = require("../controllers/todoListController.js");
const authVerify = require("../middleware/authVerify.js");

router.post("/createProfile", profileController.CreateProfile);
router.post("/userLogin", profileController.UserLogin);
router.get("/selectProfile", authVerify, profileController.SelectProfile);
router.post("/updateProfile", authVerify, profileController.UpdateProfile);

// to-do
router.post("/createTodo", authVerify, todoController.CreateTodo);

module.exports = router;
