'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Absensi extends Model {
    static associate(models) {
        Absensi.belongsTo(models.Rekapan, {
          foreignKey: 'id_rekapan',
          as: 'rekapan'
        });
        Absensi.belongsTo(models.User, {
          foreignKey: 'id_user',
          as: 'user'
        });
    }
  }
  Absensi.init({
    id_rekapan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Rekapan',
          key: 'id_rekapan'
        }
      },
      id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id_user'
        }
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      gambar: {
        type: DataTypes.STRING(255),
        allowNull: true
      }
    }, {
      sequelize,
      modelName: 'Absensi',
      tableName: 'Absensis',
      timestamps: true
    });
  
    return Absensi;
  };