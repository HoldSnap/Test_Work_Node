'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comments', [
      {
        text: 'I love spiderman',
        articleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        text: 'Who is spiderman????',
        articleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        text: 'Spider or man or bank?',
        articleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
