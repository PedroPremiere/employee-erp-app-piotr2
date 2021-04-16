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
}

module.exports = ContractRepository;
