const { StatusCodes } = require('http-status-codes');

class DestroyController {
    constructor(contractRepository) {
        this.contractRepository = contractRepository;
    }

    async invoke(request, response) {
        const { id } = request.params;

        await this.contractRepository.delete(id);

        return response.sendStatus(StatusCodes.NO_CONTENT);
    }
}

module.exports = DestroyController;
