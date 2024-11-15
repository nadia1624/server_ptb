const express = require("express");
const router = express.Router();
const ProfileController = require("../controllers/profileControllers");
const {authenticateToken} = require("../middleware/authToken")

router.post("/changepassword", authenticateToken, ProfileController.changePassword)

module.exports = router;