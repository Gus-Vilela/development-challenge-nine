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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Nome não pode ser vazio',
          },
        },
      },
      birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Data de nascimento não pode ser vazia',
          },
          isDate: {
            msg: 'Data de nascimento inválida',
          },
          isBefore: {
            args: new Date().toISOString().split('T')[0],
            msg: 'Data de nascimento deve ser anterior a data atual',
          },
        },
      },
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
          async isUnique(email) {
            const user = await Patient.findOne({ where: { email } });
            if (user) {
              throw new Error('Email já cadastrado');
            }
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Endereço não pode ser vazio',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Patient',
    }
  );
  return Patient;
};
