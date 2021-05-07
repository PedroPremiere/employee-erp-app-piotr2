const { StatusCodes } = require('http-status-codes');

class DestroyController {
    constructor(userRepository, fileService) {
        this.userRepository = userRepository;
        this.fileService = fileService;
    }

    async invoke(request, response) {
        const { id } = request.params;

        await this.userRepository.delete(id);

        return response.sendStatus(StatusCodes.NO_CONTENT);
    }
}

module.exports = DestroyController;
