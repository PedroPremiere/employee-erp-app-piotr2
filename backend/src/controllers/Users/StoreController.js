const { StatusCodes } = require('http-status-codes');

class StoreController {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async invoke(request, response) {
        const {
            firstName,
            lastName,
            email,
            password,
            admin,
            birthDate
        } = request.body;

        const user = await this.userRepository.create({
            firstName,
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
