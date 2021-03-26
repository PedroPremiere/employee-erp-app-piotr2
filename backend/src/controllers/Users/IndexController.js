const models = require('../../models');
const { User } = models;

exports.getAll = async (reg, res) => {
    //temporary just for check
    const user = await User.create({
        name: 'alice123',
        lastName: 'asdasd',
        email: 'asdas@ads.com',
        password: 'asdsafas',
        admin: true,
        birthDate: new Date()
    });

    User.findAll().then(users => {
        return res.json(users);
    });
};
