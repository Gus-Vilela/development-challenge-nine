const { Patient } = require('../models/Database');

module.exports = {
  store(req, res) {
    Patient.create(req.body).then((patient) => {
      res.json(patient);
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
