const { StatusCodes } = require('http-status-codes');

class DestroyController {
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

        if (!vacation && !isAdmin) {
            return response.sendStatus(StatusCodes.FORBIDDEN);
        }

        if (vacation) {
            const vacationDuration =
                this.vacationDurationCalculator.countDurationInDays(
                    vacation.startDate,
                    vacation.endDate
                );

            const vacationOwner = await this.userRepository.findById(
                vacation.userId
            );

            vacationOwner.update({
                vacationDays: Math.ceil(
                    vacationOwner.vacationDays + vacationDuration
                )
            });

            vacation.destroy();
        }

        return response.sendStatus(StatusCodes.NO_CONTENT);
    }
}

module.exports = DestroyController;
