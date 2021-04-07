const { StatusCodes } = require('http-status-codes');

class ShowController {
    constructor(vacationRepository) {
        this.vacationRepository = vacationRepository;
    }

    async invoke(request, response) {
        const { id } = request.params;

        const vacation = await this.vacationRepository.findById(id);

        if (!vacation) {
            return response.sendStatus(StatusCodes.NOT_FOUND);
        }

        return response.send(vacation);
    }
}

module.exports = ShowController;
