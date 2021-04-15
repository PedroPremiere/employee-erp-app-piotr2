module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Contracts', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true
            },
            position: {
                type: Sequelize.STRING,
                allowNull: false
            },
            startDate: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            endDate: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            userId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
        await queryInterface.addIndex('Contracts', [
            'userId',
            'startDate',
            'endDate'
        ]);
        await queryInterface.addIndex('Contracts', ['userId', 'endDate']);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Contracts');
    }
};
