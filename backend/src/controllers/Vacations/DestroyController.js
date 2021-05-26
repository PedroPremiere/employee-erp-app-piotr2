const { StatusCodes } = require('http-status-codes');

class DestroyController {
    constructor(vacationRepository) {
        this.vacationRepository = vacationRepository;
    }

    async invoke(request, response) {
        const { id } = request.params;
        const { loggedUser } = request;
        const isAdmin = await loggedUser.isAdmin();

        const where = {};
        where.id = id;

        if (!isAdmin) {
            where.userId = loggedUser.id;
            where.isConfirmed = false;
        }

        const vacation = await this.vacationRepository.findOne({ where });

        if (vacation) {
            vacation.destroy();
        }

        return response.sendStatus(StatusCodes.NO_CONTENT);
    }
}

module.exports = DestroyController;
