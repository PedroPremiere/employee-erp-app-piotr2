const di = require('../di');

const userRepository = di.get('repositories.user');
const contractRepository = di.get('repositories.contract');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const [user, admin] = await Promise.all([
            userRepository.getByEmail('user@user.com'),
            userRepository.getByEmail('admin@admin.com')
        ]);

        await contractRepository.create({
            startDate: '2021-04-08',
            endDate: '2021-04-22',
            position: 'driver',
            vacationDaysPerYear: 20,
            vacationDays: 1,
            userId: user.id
        });

        await contractRepository.create({
            startDate: '2021-10-16',
            endDate: '2021-12-25',
            position: 'driver',
            vacationDaysPerYear: 20,
            vacationDays: 1,
            userId: user.id
        });

        await contractRepository.create({
            startDate: '2021-01-01',
            endDate: '2021-12-25',
            position: 'admin',
            vacationDaysPerYear: 26,
            vacationDays: 1,
            userId: admin.id
        });
    },

    down: async (queryInterface, Sequelize) => {}
};
