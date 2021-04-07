const { StatusCodes } = require('http-status-codes');

class DestroyController {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async invoke(request, response) {
        const { id } = request.params;

        await this.userRepository.delete(id);

        return response.sendStatus(StatusCodes.NO_CONTENT);
    }
}

module.exports = DestroyController;
