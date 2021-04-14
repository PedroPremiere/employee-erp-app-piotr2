module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Vacations', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true
            },
            startDate: {
                type: Sequelize.DATEONLY
            },
            endDate: {
                type: Sequelize.DATEONLY
            },
            id: {
                type: Sequelize.UUID
            },
            confirmed: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            userId: {
                type: Sequelize.UUID,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Vacations');
    }
};
