const AbstractRepository = require('./AbstractRepository');

class UserRepository extends AbstractRepository {
    get model() {
        return this.db.User;
    }

    async getByEmail(email) {
        const user = await this.model.findOne({ where: { email } });

        return user;
    }
}

module.exports = UserRepository;
