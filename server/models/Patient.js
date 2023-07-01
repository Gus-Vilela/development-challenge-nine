'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    static associate(models) {
      // define association here
    }
  }
  Patient.init(
    {
      name: DataTypes.STRING,
      birthDate: DataTypes.DATEONLY,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: 'Email não pode ser vazio',
          },
          isEmail: {
            msg: 'Email inválido',
          },
        },
      },
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Patient',
    }
  );
  return Patient;
};
