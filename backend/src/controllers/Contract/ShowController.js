const { StatusCodes } = require('http-status-codes');

class ShowController {
    constructor(contractRepository) {
        this.contractRepository = contractRepository;
    }

    async invoke(request, response) {
        const { id } = request.params;
        const { loggedUser } = request;
        const isAdmin = await loggedUser.isAdmin();

        const contract = await this.contractRepository.getById(id);

        if (!contract) {
            return response.sendStatus(StatusCodes.NOT_FOUND);
        }

        if (contract.userId !== loggedUser.id && !isAdmin) {
            return response.sendStatus(StatusCodes.FORBIDDEN);
        }

        return response.send(contract);
    }
}

module.exports = ShowController;
