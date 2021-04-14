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

        const user1 = await userRepository.create({
            firstName: 'John',
            lastName: 'Doe',
            email: 'example@example.com',
            birthDate: new Date(),
            password: 'password123'
        });

        await user1.addRole(userRole.id);

        const user2 = await userRepository.create({
            firstName: 'Robert',
            lastName: 'Lee',
            email: 'robert@lee.com',
            birthDate: new Date(),
            password: 'password123'
        });

        await user2.addRole(userRole.id);

        const user3 = await userRepository.create({
            firstName: 'user',
            lastName: 'user',
            email: 'user@user.com',
            birthDate: new Date(),
            password: 'password123'
        });

        await user3.addRole(userRole.id);

        const user4 = await userRepository.create({
            firstName: 'admin',
            lastName: 'admin',
            email: 'admin@admin.com',
            birthDate: new Date(),
            password: 'password123'
        });

        await user4.addRole(adminRole.id);
    },

    down: async (queryInterface, Sequelize) => {}
};
