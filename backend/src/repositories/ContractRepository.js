const { Op } = require('sequelize');

const AbstractRepository = require('./AbstractRepository');

class ContractRepository extends AbstractRepository {
    get model() {
        return this.db.Contract;
    }

    findContractbyUserAndDate(userId, startDate, endDate) {
        return this.model.findOne({
            where: { userId, startDate, endDate }
        });
    }

    findContractbyUserInDataRange(userId, startDate, endDate) {
        return this.model.findOne({
            where: {
                [Op.and]: [
                    { userId },
                    {
                        [Op.or]: [
                            {
                                startDate: { [Op.gte]: startDate },
                                endDate: { [Op.lte]: endDate }
                            },
                            {
                                startDate: { [Op.lte]: startDate },
                                endDate: { [Op.gte]: startDate }
                            },
                            {
                                startDate: { [Op.lte]: endDate },
                                endDate: { [Op.gte]: endDate }
                            }
                        ]
                    }
                ]
            }
        });
    }
}

module.exports = ContractRepository;
