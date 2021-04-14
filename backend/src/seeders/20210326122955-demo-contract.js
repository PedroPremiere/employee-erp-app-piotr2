const { v4: uuidv4 } = require('uuid');
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Contracts', [
            {
                startDate: new Date(),
                enddate: new Date(),
                id: uuidv4(),
                position: 'driver',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                startDate: new Date(),
                enddate: new Date(),
                id: uuidv4(),
                position: 'sales person',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {}
};
