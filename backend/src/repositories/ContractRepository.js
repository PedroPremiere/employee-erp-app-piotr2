const { Op } = require('sequelize');

const AbstractIntervalRepository = require('./AbstractIntervalRepository');

class ContractRepository extends AbstractIntervalRepository {
    get model() {
        return this.db.Contract;
    }

    findContractbyUserAndDate(userId, startDate, endDate) {
        return this.model.findOne({
            where: { userId, startDate, endDate }
        });
    }

    getById(id) {
        return this.model.findByPk(id, {
            include: [
                {
                    association: 'user',
                    attributes: ['lastName', 'firstName', 'email', 'id']
                }
            ]
        });
    }
}

module.exports = ContractRepository;
