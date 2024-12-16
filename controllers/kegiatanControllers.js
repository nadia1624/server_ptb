const { Kegiatan, AbsensiKegiatan, User } = require("../models");
const { Op, where } = require("sequelize");
const path = require("path");
const fs = require("fs");

class KegiatanController {
  // Mendapatkan daftar kegiatan yang dapat diakses user
  // static async getDaftarKegiatan(req, res) {
  //   try {
  //     const userId = req.user.id_user; // Dari middleware autentikasi

  //     // Ambil semua kegiatan yang statusnya aktif (1)
  //     const kegiatans = await Kegiatan.findAll({
  //       attributes: [
  //         "id_kegiatan",
  //         "nama_kegiatan",
  //         "deskripsi",
  //         "jam_kegiatan",
  //         "tanggal_kegiatan",
  //       ],
  //       include: [
  //         {
  //           model: AbsensiKegiatan,
  //           as: "absensikegiatans",
  //           where: { id_user: userId },
  //           required: false, // Left join
  //         },
  //       ],
  //     });

  //     // Transformasi data untuk menambahkan status absensi
  //     const kegiatanWithStatus = kegiatans.map((kegiatan) => {
  //       const absensiKegiatan = kegiatan.absensikegiatans[0]; // Pastikan ini benar
  //       return {
  //         id_user: userId,
  //         id_kegiatan: kegiatan.id_kegiatan,
  //         nama_kegiatan: kegiatan.nama_kegiatan,
  //         deskripsi: kegiatan.deskripsi,
  //         jam_kegiatan: kegiatan.jam_kegiatan,
  //         tanggal_kegiatan: kegiatan.tanggal_kegiatan,
  //         status_absensi: absensiKegiatan ? absensiKegiatan.status_absensi : 1,
  //       };
  //     });

  //     res.status(200).json({
  //       message: "Berhasil mendapatkan daftar kegiatan",
  //       data: kegiatanWithStatus,
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       message: "Gagal mendapatkan daftar kegiatan",
  //       error: error.message,
  //     });
  //     console.error("Error di query:", error.message);
  //   }
  // }

  // Mengisi absensi kegiatan
  static async isiAbsensiKegiatan(req, res) {
    try {
      const { id_kegiatan } = req.params;
      console.log("Id Kegiatan", id_kegiatan);
      const userId = req.user.id_user;
      const gambar = req.file; // File upload dari middleware multer

      // Validasi kegiatan masih aktif
      const kegiatan = await Kegiatan.findByPk(id_kegiatan);
      if (!kegiatan || kegiatan.status !== 1) {
        return res.status(400).json({
          message: "Ups! Kamu sudah tidak bisa mengambil absensi",
          status: "failed",
        });
      }

      // Cek apakah user sudah pernah absen
      const existingAbsensi = await AbsensiKegiatan.findOne({
        where: {
          id_user: userId,
          id_kegiatan: id_kegiatan,
          status_absensi: 2,
        },
      });

      if (existingAbsensi) {
        return res.status(400).json({
          message: "Absensi mu sudah tercatat!",
          status: "success",
          data: {
            id_user: userId,
            id_kegiatan: id_kegiatan,
            gambar: gambar.filename,
            statusAbsen: 2,
            namaKegiatan: kegiatan.nama_kegiatan,
          },
        });
      }

      // Simpan absensi
      const absensiKegiatan = await AbsensiKegiatan.update(
        {
          status_absensi: 2, // Berhasil absen
          gambar: gambar.filename,
        },
        {
          where: {
            id_kegiatan: id_kegiatan,
            id_user: userId,
          },
        }
      );

      res.status(201).json({
        message: "Absensi mu berhasil dicatat!",
        status: "success",
        data: {
          deskripsi: kegiatan.deskripsi,
          gambar: absensiKegiatan.gambar,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal mengisi absensi",
        error: error.message,
      });
      console.log("Error: ", error);
    }
  }

  // Mendapatkan riwayat absensi kegiatan user
  static async getRiwayatAbsensi(req, res) {
    try {
      const userId = req.user.id_user;
      console.log("User ID dari middleware:", userId);

      const riwayatAbsensi = await AbsensiKegiatan.findAll({
        where: { id_user: userId },
        include: [
          {
            model: Kegiatan,
            as: "kegiatan",
            attributes: [
              "id_kegiatan",
              "nama_kegiatan",
              "deskripsi",
              "tanggal_kegiatan",
              "jam_kegiatan",
            ],
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      res.status(200).json({
        message: "Berhasil mendapatkan riwayat absensi",
        data: riwayatAbsensi,
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal mendapatkan riwayat absensi",
        error: error.message,
      });
      console.error("Error saat mendapatkan riwayat absensi:", error);
    }
  }

  static async getDetailKegiatan(req, res) {
    try {
      const id_kegiatan = req.params.id_kegiatan; // Ambil ID kegiatan dari parameter
      const id_user = req.user.id_user; // Ambil ID user dari data pengguna yang sedang login

      const kegiatan = await AbsensiKegiatan.findOne({
        where: {
          id_kegiatan: id_kegiatan, // Filter berdasarkan ID kegiatan
          id_user: id_user, // Filter berdasarkan ID user
        },
        include: [
          {
            model: Kegiatan,
            as: "kegiatan",
            attributes: ["nama_kegiatan", "deskripsi"],
          },
        ],
      });

      if (!kegiatan) {
        return res.status(404).json({ message: "Kegiatan tidak ditemukan." });
      }

      res.status(200).json(kegiatan); // Kirimkan data kegiatan
    } catch (error) {
      console.error("Error fetching detail kegiatan:", error);
      res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
  }
}

module.exports = KegiatanController;
