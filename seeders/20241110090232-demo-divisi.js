'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Divisis', [
      { nama_divisi: 'Inti', createdAt: new Date(), updatedAt: new Date() },
      { nama_divisi: 'PSDM', createdAt: new Date(), updatedAt: new Date() },
      { nama_divisi: 'External', createdAt: new Date(), updatedAt: new Date() },
      { nama_divisi: 'Internal', createdAt: new Date(), updatedAt: new Date() },
      { nama_divisi: 'RTK', createdAt: new Date(), updatedAt: new Date() },
      { nama_divisi: 'Medkraf', createdAt: new Date(), updatedAt: new Date() },
      { nama_divisi: 'Bikraf', createdAt: new Date(), updatedAt: new Date() },
      { nama_divisi: 'PSI', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Divisis', null, {});
  }
};