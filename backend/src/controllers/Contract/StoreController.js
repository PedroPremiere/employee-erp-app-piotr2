const { StatusCodes } = require('http-status-codes');

class StoreController {
    constructor(contractRepository) {
        this.contractRepository = contractRepository;
    }

    async invoke(request, response) {
        const { position, startDate, endDate, userId } = request.body;

        const contract = await this.contractRepository.create({
            position,
            startDate,
            endDate,
            userId
        });

        return response.status(StatusCodes.CREATED).send(contract);
    }
}

module.exports = StoreController;
