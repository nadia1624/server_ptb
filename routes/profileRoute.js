const express = require("express");
const router = express.Router();
const ProfileController = require("../controllers/profileControllers");

router.post("/changepassword", ProfileController.changePassword)

module.exports = router;