const express = require("express");
const router = express.Router();
const AbsensiController = require("../controllers/absensiControllers");

router.get("/", AbsensiController.lihatAbsensi);
router.get("/detail/:id_rekapan", AbsensiController.lihatDetailAbsensi);
router.get("/create", AbsensiController.getCreateAbsensi)
router.post("/create", AbsensiController.createAbsensi)

module.exports = router;