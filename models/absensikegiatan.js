module.exports = (sequelize, DataTypes) => {
  const AbsensiKegiatan = sequelize.define(
    "AbsensiKegiatan",
    {
      id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "Users",
          key: "id_user",
        },
      },
      id_kegiatan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "Kegiatans",
          key: "id_kegiatan",
        },
      },
      status_absensi: DataTypes.INTEGER,
      gambar: DataTypes.STRING,
    },
    {
      tableName: "AbsensiKegiatans", // Sesuaikan dengan nama tabel
    }
  );

  AbsensiKegiatan.associate = (models) => {
    AbsensiKegiatan.belongsTo(models.Kegiatan, {
      as: "kegiatan", // Alias jika diperlukan
      foreignKey: "id_kegiatan",
    });
  };

  return AbsensiKegiatan;
};
