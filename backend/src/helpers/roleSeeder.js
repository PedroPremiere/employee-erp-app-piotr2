const roleFactory = require('../factories/Role');

module.exports = async () => {
    const adminRole = await roleFactory.create('admin');
    const userRole = await roleFactory.create('user');
    return { adminRole, userRole };
};
