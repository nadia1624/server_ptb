'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('kegiatans', [
      {
        id_kegiatan: 1,
        nama_kegiatan: 'Workshop UI/UX',
        deskripsi: 'Workshop tentang UI/UX Design untuk mahasiswa.',
        jam_kegiatan: '10:00',
        tanggal_kegiatan: '2024-11-21',
        status: 1,  // Kegiatan terbuka untuk absensi
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_kegiatan: 2,
        nama_kegiatan: 'Seminar Teknologi',
        deskripsi: 'Seminar tentang perkembangan teknologi terbaru.',
        jam_kegiatan: '13:00',
        tanggal_kegiatan: '2024-11-20',
        status: 0,  // Kegiatan sudah ditutup, tidak bisa absensi
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_kegiatan: 3,
        nama_kegiatan: 'Pelatihan Pemrograman Python',
        deskripsi: 'Pelatihan dasar pemrograman Python untuk pemula.',
        jam_kegiatan: '09:00',
        tanggal_kegiatan: '2024-11-22',
        status: 1,  // Kegiatan terbuka untuk absensi
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_kegiatan: 4,
        nama_kegiatan: 'Kursus Data Science',
        deskripsi: 'Kursus mengenai data science dan analisis data.',
        jam_kegiatan: '14:00',
        tanggal_kegiatan: '2024-11-23',
        status: 0,  // Kegiatan sudah ditutup, tidak bisa absensi
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('kegiatans', null, {});
  }
};
