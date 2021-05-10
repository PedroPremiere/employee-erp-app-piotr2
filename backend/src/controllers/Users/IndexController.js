const { Op } = require('sequelize');

class IndexController {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async invoke(request, response) {
        const { query } = request.query;
        const where = {};

        if (query) {
            where[Op.or] = [
                { lastName: { [Op.like]: `%${query}%` } },
                { firstName: { [Op.like]: `%${query}%` } },
                { email: { [Op.like]: `%${query}%` } },
                { id: { [Op.like]: `%${query}%` } }
            ];
        }

        const users = await this.userRepository.findAll({ where });

        return response.send(users);
    }
}

module.exports = IndexController;
