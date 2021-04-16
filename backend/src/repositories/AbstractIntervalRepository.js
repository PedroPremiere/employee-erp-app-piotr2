const { Op } = require('sequelize');

const AbstractRepository = require('./AbstractRepository');

class AbstractIntervalRepository extends AbstractRepository {
    findOneIncludesUserAndDataRange(userId, startDate, endDate) {
        return this.model.findOne({
            where: {
                [Op.and]: [
                    { userId },
                    {
                        startDate: { [Op.lte]: startDate },
                        endDate: { [Op.gte]: endDate }
                    }
                ]
            }
        });
    }

    findOneByOverlapingDateAndUser(userId, startDate, endDate) {
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

module.exports = AbstractIntervalRepository;
