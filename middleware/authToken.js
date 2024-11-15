const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// Middleware untuk autentikasi token
const authenticateToken = (req, res, next) => {
  const secret = process.env.SECRET_TOKEN;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Ambil token dari header Authorization

  if (!token) {
    console.log("No token provided");
    return res.sendStatus(401); // Jika tidak ada token
  }

  // Verifikasi token
  jwt.verify(token, secret, (err, user) => {
    if (err) {
      console.log("Invalid token", err); // Menambahkan log error
      return res.sendStatus(403); // Jika token tidak valid
    }

    req.user = user; // Menyimpan data user dari token
    next(); // Lanjutkan ke route berikutnya
  });
};

module.exports = { authenticateToken };
