const express = require("express");
const router = express.Router();
const ProfileController = require("../controllers/profileControllers");
const { authenticateToken } = require("../middleware/authToken");
const upload = require("../middleware/upload");

// Rute untuk menampilkan gambar profil
router.get("/profile/image", authenticateToken, ProfileController.getProfileImage);

// Rute untuk mengunggah gambar profil
router.post("/profile/upload", authenticateToken, upload.single("gambar"), ProfileController.uploadProfileImage);

// Rute untuk mengganti gambar profil
router.put("/profile/image", authenticateToken, upload.single("gambar"), ProfileController.updateProfileImage);

// Rute untuk mengganti password (sudah ada)
router.patch("/changepassword", authenticateToken, ProfileController.changePassword);

module.exports = router;
