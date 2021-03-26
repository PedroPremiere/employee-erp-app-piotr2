const { v4: uuidv4 } = require('uuid');
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            {
                id: uuidv4(),
                name: 'John',
                lastName: 'Doe',
                email: 'example@example.com',
                password: 'password123',
                birthDate: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: uuidv4(),
                name: 'John2',
                lastName: 'Doe2',
                email: 'example2@example.com',
                password: 'password123',
                birthDate: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
