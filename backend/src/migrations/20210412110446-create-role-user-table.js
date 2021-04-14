module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Role2User', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true
            },
            userId: {
                type: Sequelize.UUID,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            roleId: {
                type: Sequelize.UUID,
                references: {
                    model: 'Roles',
                    key: 'id'
                }
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Role2User');
    }
};
