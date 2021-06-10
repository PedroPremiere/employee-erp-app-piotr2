const { StatusCodes } = require('http-status-codes');

class ShowController {
    constructor(vacationRepository) {
        this.vacationRepository = vacationRepository;
    }

    async invoke(request, response) {
        const { id } = request.params;
        const { loggedUser } = request;
        const isAdmin = await loggedUser.isAdmin();

        const vacation = await this.vacationRepository.findById(id);

        if (!vacation) {
            return response.sendStatus(StatusCodes.NOT_FOUND);
        }

        if (vacation.userId !== loggedUser.id && !isAdmin) {
            return response.sendStatus(StatusCodes.FORBIDDEN);
        }

        return response.send(vacation);
    }
}

module.exports = ShowController;
