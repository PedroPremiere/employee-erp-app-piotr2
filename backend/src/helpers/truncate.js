const models = require('../models/index');

module.exports = async () => {
    await models.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {
        raw: true
    });

    for (const model in models.sequelize.models) {
        await models.sequelize.models[model].truncate({ force: true });
    }

    await models.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {
        raw: true
    });
};
