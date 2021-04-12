const AbstractRepository = require('./AbstractRepository');

class UserRepository extends AbstractRepository {
    get model() {
        return this.db.User;
    }

    async getByEmail(email) {
        const user = await this.model.findOne({ where: { email } });

        return user;
    }

    async getPassword(userId) {
        const { password } = await this.model.findByPk(userId, {
            attributes: ['password']
        });

        return password;
    }
}

module.exports = UserRepository;
