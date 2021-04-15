module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Vacations', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true
            },
            startDate: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            endDate: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            isConfirmed: {
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
