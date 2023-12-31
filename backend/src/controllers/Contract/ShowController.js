const { StatusCodes } = require('http-status-codes');

class ShowController {
    constructor(contractRepository) {
        this.contractRepository = contractRepository;
    }

    async invoke(request, response) {
        const { id } = request.params;

        const contract = await this.contractRepository.findById(id, {
            include: [
                {
                    association: 'user',
                    attributes: ['lastName', 'firstName', 'email', 'id']
                }
            ]
        });

        if (!contract) {
            return response.sendStatus(StatusCodes.NOT_FOUND);
        }

        return response.send(contract);
    }
}

module.exports = ShowController;
