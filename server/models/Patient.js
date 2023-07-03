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
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
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
        validate: {
          notEmpty: {
            msg: 'Email não pode ser vazio',
          },
          isEmail: {
            msg: 'Email inválido',
          },
          isUniqueEmail(value, next) {
            Patient.findOne({
              where: { email: value },
              // verify if its not itself
            }).then((patient) => {
              console.log(patient);
              console.log(this);
              if (patient && patient.id !== this.id) {
                return next('Email já cadastrado');
              }
              return next();
            });
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
