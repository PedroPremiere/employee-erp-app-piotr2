const { StatusCodes } = require('http-status-codes');

class StoreController {
    constructor(vacationRepository) {
        this.vacationRepository = vacationRepository;
    }

    async invoke(request, response) {
        const { startDate, endDate, userId } = request.body;

        const vacation = await this.vacationRepository.create({
            startDate,
            endDate,
            userId
        });

        return response.status(StatusCodes.CREATED).send(vacation);
    }
}

module.exports = StoreController;
