const di = require('../di');

const userRepository = di.get('repositories.user');
const vacationRepository = di.get('repositories.vacation');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const [user, admin] = await Promise.all([
            userRepository.getByEmail('user@user.com'),
            userRepository.getByEmail('admin@admin.com')
        ]);

        await vacationRepository.create({
            startDate: new Date(),
            endDate: new Date(),
            userId: user.id
        });

        await vacationRepository.create({
            startDate: '2021-10-20',
            endDate: '2021-10-22',
            userId: user.id
        });

        await vacationRepository.create({
            startDate: '2021-12-22',
            endDate: '2021-12-23',
            userId: user.id,
            isConfirmed: true
        });

        await vacationRepository.create({
            startDate: '2021-12-27',
            endDate: '2021-12-27',
            userId: admin.id,
            isConfirmed: true
        });
    },

    down: async (queryInterface, Sequelize) => {}
};
