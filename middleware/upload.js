const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Pastikan folder "uploads" ada
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Buat folder secara rekursif jika belum ada
}

// Konfigurasi Penyimpanan File
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Gunakan folder yang sudah dipastikan ada
  },
  filename: function (req, file, cb) {
    // Tambahkan pengecekan ekstensi file
    const ext = path.extname(file.originalname).toLowerCase();
    if (![".jpg", ".jpeg", ".png"].includes(ext)) {
      return cb(new Error("Format file tidak valid"));
    }
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

console.log(this.fields);

// Middleware Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    // Double check MIME type
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/*"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(
        new Error("Hanya format JPEG, PNG, dan JPG yang diizinkan"),
        false
      );
    }

    // Double check file extension
    const ext = path.extname(file.originalname).toLowerCase();
    if (![".jpg", ".jpeg", ".png"].includes(ext)) {
      return cb(new Error("Format file tidak valid"), false);
    }

    cb(null, true);
  },
});

module.exports = upload;
