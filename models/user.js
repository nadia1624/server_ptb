"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define association to Divisi
      User.belongsTo(models.Divisi, {
        foreignKey: "id_divisi", // Foreign key in User
        as: "divisi", // Optional alias for relation
      });

      User.hasMany(models.AbsensiKegiatan, {
        foreignKey: "id_user",
        as: "AbsensiKegiatans",
      });
    }
  }

  User.init(
    {
      id_user: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nim: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jadwal: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      jabatan: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gambar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      id_divisi: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Divisi",
          key: "id_divisi",
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
