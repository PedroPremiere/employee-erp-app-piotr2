const { v4: uuidv4 } = require('uuid');
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Vacations', [
            {
                startDate: new Date(),
                enddate: new Date(),
                id: uuidv4(),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                startDate: new Date(),
                enddate: new Date(),
                id: uuidv4(),
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {}
};
