const express = require("express");
const router = express.Router();
const KegiatanController = require("../controllers/kegiatanControllers");
const authToken = require("../middleware/authToken"); // Middleware autentikasi
const upload = require("../middleware/upload"); // Middleware upload file

// Endpoint untuk mendapatkan daftar kegiatan
// router.get('/kegiatan',
//   authToken.authenticateToken, // Middleware untuk memeriksa token
//   KegiatanController.getDaftarKegiatan
// );

// Endpoint untuk mengisi absensi kegiatan
router.post(
  "/kegiatan/:id_kegiatan/absensi",
  authToken.authenticateToken,
  upload.single("gambar"), // Middleware upload dengan nama field 'gambar'
  KegiatanController.isiAbsensiKegiatan
);

// Endpoint untuk mendapatkan riwayat absensi
router.get(
  "/riwayat-absensi",
  authToken.authenticateToken,
  KegiatanController.getRiwayatAbsensi
);

module.exports = router;
