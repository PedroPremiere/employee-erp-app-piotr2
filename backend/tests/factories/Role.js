const { Role } = require('../../src/models');

class RoleFactory {
    static create(name) {
        return Role.create({ name });
    }
}

module.exports = RoleFactory;
