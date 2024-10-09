'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Articles', [
      {
        title: 'SpiderMan',
        content: 'Who is Spider',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Robbery',
        content: 'SpiderMan defended bank',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Articles', null, {});
  }
};
