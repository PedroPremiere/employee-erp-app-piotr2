'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Roles', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true
            },
            title: {
                type: Sequelize.UUID
            },
            id: {
                type: Sequelize.UUID
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
        await queryInterface.dropTable('Roles');
    }
};
