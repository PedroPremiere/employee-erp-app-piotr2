const db = require('../models');

module.exports = {
    parameters: {
        'db.sequelize.models': db.sequelize.models
    },
    services: {
        'repositories.user': {
            class: 'repositories/UserRepository',
            arguments: ['%db.sequelize.models%']
        },
        'repositories.contract': {
            class: 'repositories/ContractRepository',
            arguments: ['%db.sequelize.models%']
        },
        'repositories.vacation': {
            class: 'repositories/VacationRepository',
            arguments: ['%db.sequelize.models%']
        }
    }
};
