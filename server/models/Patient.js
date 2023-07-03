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
        trim: true,
        validate: {
          notEmpty: {
            msg: 'Nome não pode ser vazio',
          },
          noSpecialChars(value) {
            // Check if the name contains any non-alphabetic characters
            const regex = /[^a-z ]/i;
            if (regex.test(value)) {
              throw new Error('Nome não pode conter caracteres especiais');
            }
          },
          async sanitizeSpaces(value) {
            // Replace any sequence of two or more spaces with a single space
            const sanitizedValue = await sequelize.fn(
              'REGEXP_REPLACE',
              value,
              '\\s{2,}',
              ' '
            );
            // Assign the sanitized value back to the attribute
            this.name = sanitizedValue; // corrected attribute name
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
        trim: true,
        validate: {
          notEmpty: {
            msg: 'Email não pode ser vazio',
          },
          isEmail: {
            msg: 'Email inválido',
          },
          async isUniqueEmail(value) {
            // changed to async function
            const patient = await Patient.findOne({
              // await for query result
              where: { email: value },
              // verify if its not itself
            });
            if (patient && patient.id !== this.id) {
              throw new Error('Email já cadastrado'); // throw error instead of using next
            }
          },
          async sanitizeEmail(value) {
            // Convert the email to lowercase
            const sanitizedEmail = await sequelize.fn('LOWER', value);
            // Assign the sanitized email back to the attribute
            this.email = sanitizedEmail;
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        validate: {
          notEmpty: {
            msg: 'Endereço não pode ser vazio',
          },
          async sanitizeSpecialChars(value) {
            // Replace any sequence of two or more special characters with a single
            const sanitizedValue = await sequelize.fn(
              'REGEXP_REPLACE',
              value,
              '([^a-z0-9])([^a-z0-9])+',
              '$1'
            );
            // Assign the sanitized value back to the attribute
            this.address = sanitizedValue;
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
