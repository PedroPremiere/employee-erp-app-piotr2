const { StatusCodes } = require('http-status-codes');

class UpdateController {
    constructor(
        vacationRepository,
        userRepository,
        vacationDurationCalculator
    ) {
        this.vacationRepository = vacationRepository;
        this.userRepository = userRepository;
        this.vacationDurationCalculator = vacationDurationCalculator;
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

        const oldVacationDuration =
            this.vacationDurationCalculator.countDurationInDays(
                vacationUpdated.startDate,
                vacationUpdated.endDate
            );

        const newVacationDuration =
            this.vacationDurationCalculator.countDurationInDays(
                vacation.startDate,
                vacation.endDate
            );

        const vacationOwner = await this.userRepository.findById(
            vacationUpdated.userId
        );

        vacationOwner.update({
            vacationDays: Math.ceil(
                vacationOwner.vacationDays -
                    (oldVacationDuration - newVacationDuration)
            )
        });

        return response.send(vacationUpdated);
    }
}

module.exports = UpdateController;
