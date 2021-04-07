const { StatusCodes } = require('http-status-codes');

class UpdateController {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async invoke(request, response) {
        const { firstName, lastName, email, admin, birthDate } = request.body;
        const { id } = request.params;

        const user = await this.userRepository.getById(id);

        if (!user) {
            return response.sendStatus(StatusCodes.NOT_FOUND);
        }

        await user.update({
            firstName,
            lastName,
            email,
            admin,
            birthDate
        });

        const userUpdated = await this.userRepository.getById(id);

        return response.send(userUpdated);
    }
}

module.exports = UpdateController;
