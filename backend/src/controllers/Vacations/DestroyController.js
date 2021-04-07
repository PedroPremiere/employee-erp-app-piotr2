const { StatusCodes } = require('http-status-codes');

class DestroyController {
    constructor(vacationRepository) {
        this.vacationRepository = vacationRepository;
    }

    async invoke(request, response) {
        const { id } = request.params;

        await this.vacationRepository.delete(id);

        return response.sendStatus(StatusCodes.NO_CONTENT);
    }
}

module.exports = DestroyController;
