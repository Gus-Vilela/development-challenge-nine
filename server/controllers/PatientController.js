const Sequelize = require('sequelize');
const { Patient } = require('../models/Database');

module.exports = {
  // create a new patient and send a success or error response
  store(req, res) {
    Patient.create(req.body)
      .then((patient) => {
        res.json({ msg: 'Paciente criado com sucesso', patient });
      })
      .catch((error) => {
        if (error instanceof Sequelize.ValidationError) {
          //  send an error response with the validation error message without showing the details
          res
            .status(400)
            .json({ msg: error.errors[0].message, details: error });
        } else {
          // send a generic error response
          res.status(500).json({ msg: 'Algo deu errado', details: error });
        }
      });
  },
  // list all patients and send a success or error response
  showAll(req, res) {
    Patient.findAll()
      .then((patients) => {
        res.json(patients);
      })
      .catch((error) => {
        // send a generic error response
        res.status(500).json({ msg: 'Algo deu errado', details: error });
      });
  },
  // list a specific patient and send a success or error response
  show(req, res) {
    Patient.findByPk(req.params.id)
      .then((patient) => {
        res.json(patient);
      })
      .catch((error) => {
        res.status(500).json({ msg: 'Algo deu errado', details: error });
      });
  },
  // update a specific patient and send a success or error response
  update(req, res) {
    const { id } = req.params;
    req.body.id = Number(id);
    Patient.update(req.body, {
      where: {
        id: id,
      },
    })
      .then(() => {
        res.status(200).json({ msg: 'Paciente atualizado com sucesso' });
      })
      .catch((error) => {
        if (error instanceof Sequelize.ValidationError) {
          // send an error response with the validation error message without showing the details
          res
            .status(400)
            .json({ msg: error.errors[0].message, details: error });
        } else {
          // send a generic error response
          res.status(500).json({ msg: 'Algo deu errado', details: error });
        }
      });
  },
  // delete a specific patient and send a success or error response
  destroy(req, res) {
    const id = req.params.id;
    Patient.destroy({
      where: {
        id: id,
      },
    })
      .then(() => {
        res.status(200).json({ msg: 'Paciente removido com sucesso' });
      })
      .catch((error) => {
        res.status(500).json({ msg: 'Algo deu errado', details: error });
      });
  },
};
