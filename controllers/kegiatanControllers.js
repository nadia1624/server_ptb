const { Kegiatan, AbsensiKegiatan, User } = require("../models");
const { Op } = require("sequelize");
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
        },
      });

      if (existingAbsensi) {
        return res.status(400).json({
          message: "Absensi mu sudah tercatat!",
        });
      }

      // Simpan absensi
      const absensiKegiatan = await AbsensiKegiatan.create({
        id_user: userId,
        id_kegiatan: id_kegiatan,
        status_absensi: 2, // Berhasil absen
        gambar: gambar ? `/uploads/${gambar.filename}` : null,
      });

      res.status(201).json({
        message: "Absensi mu sudah tercatat!",
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
    }
  }

  // Mendapatkan riwayat absensi kegiatan user
  static async getRiwayatAbsensi(req, res) {
    try {
      const userId = req.user.id_user;

      const riwayatAbsensi = await AbsensiKegiatan.findAll({
        where: { id_user: userId },
        include: [
          {
            model: Kegiatan,
            as: "kegiatan",
            attributes: [
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
    }
  }
}

module.exports = KegiatanController;