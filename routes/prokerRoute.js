const express = require("express");
const router = express.Router();
const ProkerController = require("../controllers/prokerControllers");

router.get('/', ProkerController.lihatProker)

module.exports = router;