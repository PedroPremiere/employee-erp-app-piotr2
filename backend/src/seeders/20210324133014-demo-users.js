const di = require('../di');

const userRepository = di.get('repositories.user');
const roleRepository = di.get('repositories.role');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const adminRole = await roleRepository.getByName(
            roleRepository.model.ADMIN
        );
        const userRole = await roleRepository.getByName(
            roleRepository.model.USER
        );

        const user = await userRepository.create({
            firstName: 'user',
            lastName: 'user',
            email: 'user@user.com',
            birthDate: new Date(),
            password: 'password123'
        });

        await user.addRole(userRole.id);

        const admin = await userRepository.create({
            firstName: 'admin',
            lastName: 'admin',
            email: 'admin@admin.com',
            birthDate: new Date(),
            password: 'password123'
        });

        await admin.addRole(adminRole.id);
    },

    down: async (queryInterface, Sequelize) => {}
};
