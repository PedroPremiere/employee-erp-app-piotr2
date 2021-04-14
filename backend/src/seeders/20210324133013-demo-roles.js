const di = require('../di');

const roleRepository = di.get('repositories.role');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await roleRepository.create({ name: roleRepository.model.ADMIN });
        await roleRepository.create({ name: roleRepository.model.USER });
    },

    down: async (queryInterface, Sequelize) => {}
};
