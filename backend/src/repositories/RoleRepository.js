const AbstractRepository = require('./AbstractRepository');

class RoleRepository extends AbstractRepository {
    get model() {
        return this.db.Role;
    }

    getByName(name) {
        return this.model.findOne({
            where: { name }
        });
    }
}

module.exports = RoleRepository;
