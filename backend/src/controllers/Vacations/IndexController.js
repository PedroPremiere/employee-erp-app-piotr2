const models = require('../../models');
const { Vacation } = models;

exports.getAll = async (reg, res) => {
    //temporary just for check
    const vacation = await Vacation.create({
        startDate: new Date(),
        endDate: new Date()
    });

    Vacation.findAll().then(vacation => {
        return res.json(vacation);
    });
};
