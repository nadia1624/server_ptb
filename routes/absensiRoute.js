const express = require("express");
const router = express.Router();
const AbsensiController = require("../controllers/absensiControllers");
const {authenticateToken} = require("../middleware/authToken");
const upload = require("../middleware/upload")

router.get("/", authenticateToken, AbsensiController.lihatAbsensi);
router.get("/detail/:id_rekapan",authenticateToken, AbsensiController.lihatDetailAbsensi);
router.post("/create",authenticateToken,upload.single('gambar'), AbsensiController.createAbsensi)

module.exports = router;