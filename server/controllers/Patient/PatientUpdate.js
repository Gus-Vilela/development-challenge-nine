const Sequelize = require('sequelize');
const { Patient } = require('../../models/Database');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    req.body.id = Number(id);
    await Patient.update(req.body, {
      where: {
        id,
      },
    });
    return res.status(200).json({ msg: 'Paciente atualizado com sucesso' });
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
