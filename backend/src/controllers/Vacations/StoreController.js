const { StatusCodes } = require('http-status-codes');

class StoreController {
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
        const {
            startDate,
            endDate,
            userId,
            isConfirmed = false
        } = request.body;

        const options = { startDate, endDate, userId, isConfirmed };
        const { loggedUser } = request;
        const isAdmin = await loggedUser.isAdmin();

        if (!isAdmin) {
            options.userId = loggedUser.id;
            options.isConfirmed = false;
        }

        const vacation = await this.vacationRepository.create(options);

        const addedVacation = await this.vacationRepository.findById(
            vacation.id,
            {
                include: [
                    {
                        association: 'user',
                        attributes: ['lastName', 'firstName', 'email', 'id']
                    }
                ]
            }
        );

        const vacationDuration =
            this.vacationDurationCalculator.countDurationInDays(
                addedVacation.startDate,
                addedVacation.endDate
            );

        const vacationOwner = await this.userRepository.findById(
            addedVacation.userId
        );

        vacationOwner.update({
            vacationDays: Math.ceil(
                vacationOwner.vacationDays - vacationDuration
            )
        });

        return response.status(StatusCodes.CREATED).send(addedVacation);
    }
}

module.exports = StoreController;
