"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Ambil data id_user dari tabel Users
    const users = await queryInterface.sequelize.query(
      `SELECT id_user FROM users;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Ambil data id_kegiatan dari tabel Kegiatans
    const kegiatans = await queryInterface.sequelize.query(
      `SELECT id_kegiatan FROM kegiatans;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (users.length === 0 || kegiatans.length === 0) {
      throw new Error(
        "Tidak ada data di tabel Users atau Kegiatans. Tambahkan data terlebih dahulu."
      );
    }

    // Buat data absensi
    const absensiKegiatans = [];
    users.forEach((user) => {
      kegiatans.forEach((kegiatan) => {
        absensiKegiatans.push({
          id_user: user.id_user,
          id_kegiatan: kegiatan.id_kegiatan,
          status_absensi: 1, // Status absensi acak (1 hadir, 0 tidak hadir)
          gambar: null, // Bisa disesuaikan jika perlu gambar absensi
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });
    });

    // Insert data absensi ke database
    await queryInterface.bulkInsert("absensikegiatans", absensiKegiatans, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Hapus semua data di tabel AbsensiKegiatans
    await queryInterface.bulkDelete("absensikegiatans", null, {});
  },
};
