/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // adicionar a restrição de unicidade no campo email
    await queryInterface.addConstraint('Patients', {
      fields: ['email'],
      type: 'unique',
      name: 'unique_email',
    });
  },
  async down(queryInterface) {
    // remover a restrição de unicidade no campo email
    await queryInterface.removeConstraint('Patients', 'unique_email');
  },
};
