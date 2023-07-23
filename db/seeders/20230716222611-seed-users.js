const { faker } = require('@faker-js/faker');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const users = []
    for (let i = 0; i < 10; i++) {
        users.push({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            phone: faker.phone.number(),
            image: faker.image.avatar(),
            balance: faker.number.int({min: 100, max:200}),
            pending_balance: faker.number.int({min: 100, max:200}),
            false_bids: faker.number.int(0),
            createdAt: new Date(),
            updatedAt: new Date()
        })
    }
    await queryInterface.bulkInsert('Users', users, {})
      console.warn('Seeding users success')
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
        await queryInterface.bulkDelete('Users', null, {})
  }
};
