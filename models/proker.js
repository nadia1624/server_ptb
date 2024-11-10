'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Proker extends Model {
    static associate(models) {
      Proker.belongsTo(models.Divisi, {
        foreignKey: 'id_divisi',  // Foreign key in User
        as: 'divisi'               // Optional alias for relation
      });
      Proker.hasMany(models.detail_proker,{
        foreignKey: 'id_proker',  
        as: 'detail_prokers' 
      })
    }
  }
  Proker.init({
    id_proker: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    id_divisi: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Divisi',       
        key: 'id_divisi'
      }
    },
    nama_proker:{
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Proker',
  });
  return Proker;
};