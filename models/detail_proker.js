'use strict';
const {
  Model
} = require('sequelize');
const proker = require('./proker');
module.exports = (sequelize, DataTypes) => {
  class detail_proker extends Model {
    static associate(models) {
      detail_proker.belongsTo(models.Proker,{
        foreignKey:'id_proker',
        as:'proker'
      })
      detail_proker.hasMany(models.Notifikasi, {
        foreignKey: 'id_detailproker',  
        as: 'detail_prokers'         
      });
    }
  }
  detail_proker.init({
    id_detailproker: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    id_proker:{
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Proker',       
        key: 'id_proker'
      }
    },
    judul_detail_proker:{
      type: DataTypes.STRING,
      allowNull: false
    },
    tanggal:{
      type: DataTypes.DATE,
      allowNull: false
    },
    gambar:{
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'detail_proker',
  });
  return detail_proker;
};