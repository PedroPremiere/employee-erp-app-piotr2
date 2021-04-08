const { StatusCodes } = require('http-status-codes');

class UpdateController {
    constructor(contractRepository) {
        this.contractRepository = contractRepository;
    }

    async invoke(request, response) {
        const { position, startDate, endDate, userId } = request.body;
        const { id } = request.params;

        const contract = await this.contractRepository.findById(id);

        if (!contract) {
            return response.sendStatus(StatusCodes.NOT_FOUND);
        }

        await contract.update({ position, startDate, endDate, userId });

        const contractUpdated = await this.contractRepository.findById(id);

        return response.send(contractUpdated);
    }
}

module.exports = UpdateController;
