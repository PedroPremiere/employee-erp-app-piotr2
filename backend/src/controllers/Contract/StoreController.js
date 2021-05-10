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

        const addedContract = await this.contractRepository.findById(
            contract.id,
            {
                include: [
                    {
                        association: 'user',
                        attributes: ['lastName', 'firstName', 'email', 'id']
                    }
                ]
            }
        );

        return response.status(StatusCodes.CREATED).send(addedContract);
    }
}

module.exports = StoreController;
