const Sequelize = require('sequelize');
const { Patient } = require('../models/Database');

module.exports = {
  store(req, res) {
    // usar uma promessa para capturar o erro
    Patient.create(req.body)
      .then((patient) => {
        res.json(patient);
      })
      .catch((error) => {
        // se houver um erro de validação
        if (error instanceof Sequelize.ValidationError) {
          // enviar uma resposta de erro com a mensagem do erro de validação
          res.status(400).json({ error: error.message });
        } else if (error instanceof Sequelize.UniqueConstraintError) {
          // se houver um erro de restrição de unicidade
          // enviar uma resposta de erro com uma mensagem apropriada
          res.status(400).json({ error: 'Email já cadastrado' });
        } else {
          // enviar uma resposta de erro genérica
          res.status(500).json({ error: 'Algo deu errado' });
        }
      });
  },
  showAll(req, res) {
    Patient.findAll().then((patients) => {
      res.json(patients);
    });
  },
  show(req, res) {
    Patient.findByPk(req.params.id).then((patient) => {
      res.json(patient);
    });
  },
  update(req, res) {
    const id = req.params.id;
    Patient.update(req.body, {
      where: {
        id: id,
      },
    }).then(() => {
      res
        .status(200)
        .json({ msg: 'updated successfully a patient with id = ' + id });
    });
  },
  destroy(req, res) {
    const id = req.params.id;
    Patient.destroy({
      where: {
        id: id,
      },
    }).then(() => {
      res
        .status(200)
        .json({ msg: 'deleted successfully a patient with id = ' + id });
    });
  },
};
