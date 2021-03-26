const models = require('../../models');
const { Role } = models;

exports.getAll = async (reg, res) => {
    //temporary just for check
    const role = await Role.create({
        position: 'alice123',
        startDate: new Date(),
        enddate: new Date()
    });

    Role.findAll().then(role => {
        return res.json(role);
    });
};
