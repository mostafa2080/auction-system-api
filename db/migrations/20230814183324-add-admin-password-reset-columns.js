'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('Admins', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Admins', 'passwordResetToken', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Admins', 'passwordResetExpires', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('Admin');
     */

    await queryInterface.removeColumn('Admins', 'passwordResetToken');
    await queryInterface.removeColumn('Admins', 'passwordResetExpires');
  },
};
