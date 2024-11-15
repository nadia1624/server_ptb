const express = require("express");
const router = express.Router();
const AbsensiController = require("../controllers/absensiControllers");
const {authenticateToken} = require("../middleware/authToken")

router.get("/", AbsensiController.lihatAbsensi);
router.get("/detail/:id_rekapan", AbsensiController.lihatDetailAbsensi);
router.post("/create",authenticateToken, AbsensiController.createAbsensi)

module.exports = router;