const { StatusCodes } = require('http-status-codes');
const { User } = require('../../models');

class IndexController {
    static async invoke(request, response) {
        const users = await User.findAll();

        return response.send(users);
    }
}

module.exports = IndexController;
