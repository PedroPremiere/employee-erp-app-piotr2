const { v4: uuidv4 } = require('uuid');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Roles', [
            {
                id: uuidv4(),
                title: 'admin',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: uuidv4(),
                title: 'user',
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
