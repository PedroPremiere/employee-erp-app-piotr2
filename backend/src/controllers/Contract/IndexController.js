const models = require('../../models');
const { Contract } = models;

exports.getAll = async (reg, res) => {
    //temporary just for check
    const contract = await Contract.create({
        position: 'alice123',
        startDate: new Date(),
        enddate: new Date()
    });

    await Contract.findAll().then(contract => {
        return res.json(contract);
    });
};