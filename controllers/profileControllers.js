const { User, Divisi } = require("../models/index");
const bcrypt = require("bcrypt");
const { where } = require("sequelize");
const fs = require("fs");
const path = require("path");

const changePassword = async (req, res) => {
  try {
    const { passwordLama, passwordBaru, konfirmasiPassword } = req.body;

    if (!passwordLama || !passwordBaru || !konfirmasiPassword) {
      return res
        .status(400)
        .json({ message: "Isi password lama atau password barunya" });
    }
    if (konfirmasiPassword !== passwordBaru) {
      return res.status(400).json({ message: "Konfirmasi password berbeda" });
    }
    const findAccount = await User.findOne({
      where: { id_user: req.user.id_user },
    });
    console.log(req.user);
    const passwordAsli = findAccount?.password || "test";

    const passwordMatch = bcrypt.compareSync(passwordLama, passwordAsli);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Password Anda Salah" });
    }
    const salt = bcrypt.genSaltSync(10);
    const encryptPass = bcrypt.hashSync(passwordBaru, salt);
    const updatePassword = await User.update(
      {
        password: encryptPass,
      },
      { where: { id_user: findAccount.id_user } }
    );
    return res.status(200).json({ message: "Berhasil mengubah password" });
  } catch (error) {
    console.error("Error during login: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Menampilkan gambar profil
const getDataProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id_user, {
      attributes: [
        "nama_depan",
        "nama_belakang",
        "nim",
        "jadwal",
        "jabatan",
        "email",
        "gambar",
      ],
      include: [
        {
          model: Divisi,
          as: "divisi",
          attributes: ["nama_divisi"],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "Profil tidak ditemukan" });
    }

    res.status(200).json({
      message: "Berhasil mendapatkan data user",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching profile image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Mengunggah gambar profil
const uploadProfileImage = async (req, res) => {
  try {
    console.log("File received:", req.file);
    console.log("Gambar: ", req.file.filename);

    if (!req.file.filename) {
      return res.status(400).json({ message: "Tidak ada file yang diunggah" });
    }

    const updatedUser = await User.update(
      { gambar: req.file.filename },
      { where: { id_user: req.user.id_user } }
    );

    if (!updatedUser[0]) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.status(200).json({
      message: "Gambar berhasil diunggah",
      filename: req.file.filename,
    });
  } catch (error) {
    console.error("Error uploading profile image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Mengganti gambar profil
const getPhotoProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id_user);

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const imagePath = path.join(__dirname, "../uploads", user.gambar);

    // Kirim file gambar
    res.sendFile(imagePath);
  } catch (error) {
    console.error("Error fetching profile image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  changePassword,
  getDataProfile,
  uploadProfileImage,
  getPhotoProfile,
};
