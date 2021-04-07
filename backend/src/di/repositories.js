const db = require('../models');

module.exports = {
    parameters: {
        'db.sequelize.models': db.sequelize.models
    },
    services: {
        'repositories.user': {
            class: 'repositories/UserRepository',
            arguments: ['%db.sequelize.models%']
        }
    }
};
