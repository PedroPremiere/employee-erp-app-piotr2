'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Contracts', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true
            },
            position: {
                type: Sequelize.STRING
            },
            startDate: {
                type: Sequelize.DATEONLY
            },
            endDate: {
                type: Sequelize.DATEONLY
            },
            user: {
                type: Sequelize.UUID,
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
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Contracts');
    }
};
