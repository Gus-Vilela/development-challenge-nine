const Sequelize = require('sequelize');
const { Patient } = require('../../models/Database');

module.exports = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    return res.json({ msg: 'Paciente criado com sucesso', patient });
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      //  send an error response with the validation error message without showing the details
      return res
        .status(400)
        .json({ msg: error.errors[0].message, details: error });
    }
    // send a generic error response
    return res.status(500).json({ msg: 'Algo deu errado', details: error });
  }
};
