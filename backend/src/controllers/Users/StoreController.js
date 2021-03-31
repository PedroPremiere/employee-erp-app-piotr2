const { StatusCodes } = require('http-status-codes');
const { User } = require('../../models');

class StoreController {
    static async invoke(request, response) {
        const {
            name,
            lastName,
            email,
            password,
            admin,
            birthDate
        } = request.body;

        const user = await User.create({
            name,
            lastName,
            email,
            password,
            admin,
            birthDate
        });

        return response.status(StatusCodes.CREATED).send(user);
    }
}

module.exports = StoreController;
