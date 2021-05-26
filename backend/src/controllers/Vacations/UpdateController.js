const { StatusCodes } = require('http-status-codes');

class UpdateController {
    constructor(vacationRepository) {
        this.vacationRepository = vacationRepository;
    }

    async invoke(request, response) {
        const { startDate, endDate, userId, isConfirmed } = request.body;
        const { id } = request.params;

        const data = { startDate, endDate, userId, isConfirmed };
        const { loggedUser } = request;
        const isAdmin = await loggedUser.isAdmin();
        const where = {};
        where.id = id;

        if (!isAdmin) {
            where.userId = loggedUser.id;
            where.isConfirmed = false;
            data.userId = loggedUser.id;
            data.isConfirmed = false;
        }

        const vacation = await this.vacationRepository.findOne({ where });

        if (!vacation) {
            return response.sendStatus(StatusCodes.NOT_FOUND);
        }

        await vacation.update(data);

        const vacationUpdated = await this.vacationRepository.findById(id, {
            include: [
                {
                    association: 'user',
                    attributes: ['lastName', 'firstName', 'email', 'id']
                }
            ]
        });

        return response.send(vacationUpdated);
    }
}

module.exports = UpdateController;
