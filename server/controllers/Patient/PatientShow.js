const { Patient } = require('../../models/Database');

module.exports = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    return res.json(patient);
  } catch (error) {
    return res.status(500).json({ msg: 'Algo deu errado', details: error });
  }
};
