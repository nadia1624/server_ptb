const multer = require("multer");
const path = require("path");

// Konfigurasi Penyimpanan File
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
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

// Middleware Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    // Double check MIME type
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
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
