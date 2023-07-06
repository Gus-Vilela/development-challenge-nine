const { Patient } = require('../../models/Database');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    await Patient.destroy({
      where: {
        id,
      },
    });
    return res.status(200).json({ msg: 'Paciente removido com sucesso' });
  } catch (error) {
    return res.status(500).json({ msg: 'Algo deu errado', details: error });
  }
};
