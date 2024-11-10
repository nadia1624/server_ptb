// seeders/xxxxxx-demo-users.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        id_divisi: 1,
        nim: '2211521004',
        email: 'nadyadearihanifah@gmail.com',
        password: 'nadia1234',  // Gunakan hash password sebenarnya pada aplikasi production
        jabatan: 'Ketua HMSI',
        jadwal: 'Senin',
        gambar: '',
        nama_depan: 'Nadia',
        nama_belakang: 'Deari Hanifah',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_divisi: 2,
        nim: '2211523010',
        email: 'azhrameisa@gmail.com',
        password: 'meisa1234',
        jabatan: 'Ketua PSDM',
        jadwal: 'Selasa',
        gambar: '',
        nama_depan: 'Azhra',
        nama_belakang: 'Meisa Khairani',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_divisi: 1,
        nim: '2211523014',
        email: 'raniashofi@gmail.com',
        password: 'rania1234',
        jabatan: 'Sekretaris HMSI',
        jadwal: 'Rabu',
        gambar: '',
        nama_depan: 'Rania',
        nama_belakang: 'Shofi Malika',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
}
