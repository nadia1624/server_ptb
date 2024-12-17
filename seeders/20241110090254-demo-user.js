// seeders/xxxxxx-demo-users.js
const bcrypt = require("bcrypt");
("use strict");

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
      "Users",
      [
        {
          id_user: 1,
          id_divisi: 1,
          nim: "2211521004",
          email: "nadyadearihanifah@gmail.com",
          password: await bcrypt.hash("nadia1234", 10), // Gunakan hash password sebenarnya pada aplikasi production
          jabatan: "Ketua HMSI",
          jadwal: "Senin",
          gambar: "",
          nama_depan: "Nadia",
          nama_belakang: "Deari Hanifah",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_user: 2,
          id_divisi: 2,
          nim: "2211523010",
          email: "azhrameisa@gmail.com",
          password: await bcrypt.hash("meisa1234", 10),
          jabatan: "Ketua PSDM",
          jadwal: "Selasa",
          gambar: "",
          nama_depan: "Azhra",
          nama_belakang: "Meisa Khairani",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_user: 3,
          id_divisi: 1,
          nim: "2211523014",
          email: "raniashofi@gmail.com",
          password: await bcrypt.hash("rania1234", 10),
          jabatan: "Sekretaris HMSI",
          jadwal: "Rabu", 
          gambar: "",
          nama_depan: "Rania",
          nama_belakang: "Shofi Malika",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
