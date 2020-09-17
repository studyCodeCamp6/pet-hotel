'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert('Customers', [
        {
          name: 'test',
          lastName: 'test',
          phoneNumber: '6612345678',
          email: 'tester@tester.com',
          username: 'test',
          password: 'test',
          status: '0',
          image: '',
          isCustomer: 'TRUE',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'test1',
          lastName: 'test1',
          phoneNumber: '6612345678',
          email: 'tester1@tester.com',
          username: 'test1',
          password: 'test',
          status: '',
          image: '',
          isCustomer: 'TRUE',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'test3',
          lastName: 'test3',
          phoneNumber: '6612345678',
          email: 'tester@tester.com',
          username: 'test3',
          password: 'test',
          status: '',
          image: '',
          isCustomer: 'TRUE',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'test2',
          lastName: 'test2',
          phoneNumber: '6612345678',
          email: 'tester@tester.com',
          username: 'test2',
          password: 'test',
          status: '',
          image: '',
          isCustomer: 'TRUE',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'test5',
          lastName: 'test5',
          phoneNumber: '6612345678',
          email: 'tester@tester.com',
          username: 'test',
          password: 'test',
          status: '',
          image: '',
          isCustomer: 'TRUE',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  down: async (queryInterface, Sequelize) => {},
};
