const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

// Fungsi login
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Received email:", email);
    console.log("Received password:", password);

    // Pastikan email dan password tidak kosong
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Cari user berdasarkan email
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Cek password dengan bcrypt.compare() untuk membandingkan password yang di-hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(user);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ user }, process.env.SECRET_TOKEN);
    console.log("Token created successfully");

    // Kirim token ke client
    res.json({ id_user: user.id_user, token });
    console.log("berhasil login");
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
};
