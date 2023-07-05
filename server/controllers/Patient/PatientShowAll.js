const { Patient } = require('../../models/Database');

module.exports = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    return res.json(patients);
  } catch (error) {
    return res.status(500).json({ msg: 'Algo deu errado', details: error });
  }
};
