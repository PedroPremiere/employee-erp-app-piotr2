const { StatusCodes } = require('http-status-codes');
const sequelize = require('../../util/database');

class StoreController {
    constructor(
        contractRepository,
        vacationService,
        calculateContractVacationDaysOnUser
    ) {
        this.contractRepository = contractRepository;
        this.vacationService = vacationService;
        this.calculateContractVacationDaysOnUser =
            calculateContractVacationDaysOnUser;
    }

    async invoke(request, response) {
        const { vacationDaysPerYear, position, startDate, endDate, userId } =
            request.body;

        const vacationDays = await this.vacationService.vacationDaysPerYear(
            vacationDaysPerYear,
            startDate,
            endDate
        );

        const transaction = await sequelize.transaction();

        try {
            const contract = await this.contractRepository.create(
                {
                    vacationDaysPerYear,
                    vacationDays,
                    position,
                    startDate,
                    endDate,
                    userId
                },
                transaction
            );

            await this.calculateContractVacationDaysOnUser.create(
                contract,
                vacationDays,
                transaction
            );

            await transaction.commit();

            const addedContract = await this.contractRepository.getById(
                contract.id
            );

            return response.status(StatusCodes.CREATED).send(addedContract);
        } catch (error) {
            await transaction.rollback();

            throw new Error(error);
        }
    }
}

module.exports = StoreController;
