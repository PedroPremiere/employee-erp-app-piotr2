const sequelize = require('../util/database');

module.exports = async () => {
    console.log('Truncate database running...');

    const models = Object.keys(sequelize.models);
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

    for (const model of models) {
        await sequelize.models[model].truncate({ force: true });
    }

    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
};
