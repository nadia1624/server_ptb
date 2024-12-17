'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Divisis', [
      {id_divisi: 1, nama_divisi: 'Inti', createdAt: new Date(), updatedAt: new Date() },
      {id_divisi: 2, nama_divisi: 'PSDM', createdAt: new Date(), updatedAt: new Date() },
      {id_divisi: 3, nama_divisi: 'External', createdAt: new Date(), updatedAt: new Date() },
      { id_divisi: 4,nama_divisi: 'Internal', createdAt: new Date(), updatedAt: new Date() },
      {id_divisi: 5, nama_divisi: 'RTK', createdAt: new Date(), updatedAt: new Date() },
      { id_divisi: 6,nama_divisi: 'Medkraf', createdAt: new Date(), updatedAt: new Date() },
      { id_divisi: 7,nama_divisi: 'Bikraf', createdAt: new Date(), updatedAt: new Date() },
      {id_divisi: 8, nama_divisi: 'PSI', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Divisis', null, {});
  }
};