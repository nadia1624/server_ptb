// seeders/xxxxxx-demo-proker.js

"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const divisis = await queryInterface.sequelize.query(
      `SELECT id_divisi FROM Divisis;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (divisis.length === 0) {
      throw new Error(
        "Tidak ada data di tabel Divisis. Tambahkan data terlebih dahulu."
      );
    }

    // Pilih salah satu id_divisi secara acak untuk setiap user
    const randomDivisi = () =>
      divisis[Math.floor(Math.random() * divisis.length)].id_divisi;

    await queryInterface.bulkInsert(
      "Prokers",
      [
        {
          id_divisi: randomDivisi(),
          nama_proker: "Bazar",
          status: "0",
          deskripsi:
            "Acara yang diadakan oleh organisasi mahasiswa (himpunan) di lingkungan kampus untuk menjual berbagai produk atau layanan kepada mahasiswa dan masyarakat kampus.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_divisi: randomDivisi(),
          nama_proker: "Menghadiri Undangan Kegiatan",
          status: "0",
          deskripsi:
            "kegiatan yang dilakukan oleh perwakilan himpunan mahasiswa untuk memenuhi undangan acara atau kegiatan dari pihak lain, baik dari organisasi mahasiswa lain, fakultas, universitas, atau instansi eksternal.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_divisi: randomDivisi(),
          nama_proker: "Kaderisasi",
          status: "0",
          deskripsi:
            "Proses pembinaan, pelatihan, dan pengembangan individu untuk mempersiapkan mereka menjadi kader atau anggota yang berkompeten dalam suatu organisasi atau kelompok.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_divisi: randomDivisi(),
          nama_proker: "ISL",
          status: "0",
          deskripsi:
            "Kegiatan keolahragaan dalam membentuk sikap sportif antar anggota Himpunan Mahasiswa Sistem Informasi",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_divisi: randomDivisi(),
          nama_proker: "Pemberitahuan Seminar Hasil Mahasiswa",
          status: "0",
          deskripsi:
            "Informasi resmi dari himpunan mahasiswa dari departemen untuk mengumumkan jadwal pelaksanaan seminar hasil mahasiswa yang akan dilaksanakan.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Prokers", null, {});
  },
};
