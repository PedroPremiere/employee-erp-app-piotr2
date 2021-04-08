const { StatusCodes } = require('http-status-codes');

class UpdateController {
    constructor(vacationRepository) {
        this.vacationRepository = vacationRepository;
    }

    async invoke(request, response) {
        const { startDate, endDate, userId } = request.body;
        const { id } = request.params;

        const vacation = await this.vacationRepository.findById(id);

        if (!vacation) {
            return response.sendStatus(StatusCodes.NOT_FOUND);
        }

        await vacation.update({ startDate, endDate, userId });

        const vacationUpdated = await this.vacationRepository.findById(id);

        return response.send(vacationUpdated);
    }
}

module.exports = UpdateController;
