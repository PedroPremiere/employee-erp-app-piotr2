class UserRepository {
    get model() {
        const { User } = require('../models');

        return User;
    }
    async getAll() {
        const users = await this.model.findAll();

        return users;
    }

    async getById(id) {
        const user = await this.model.findByPk(id);

        return user;
    }

    async getByEmail(email) {
        const user = await this.model.findOne({ where: { email } });

        return user;
    }

    async create(person) {
        const user = await this.model.create(person);

        return user;
    }

    async delete(id) {
        await this.model.destroy({
            where: {
                id
            }
        });
    }
}

module.exports = UserRepository;
