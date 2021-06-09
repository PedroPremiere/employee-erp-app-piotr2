const { StatusCodes } = require('http-status-codes');
const sequelize = require('../../util/database');

class UpdateController {
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
        const { id } = request.params;

        const contract = await this.contractRepository.findById(id);

        if (!contract) {
            return response.sendStatus(StatusCodes.NOT_FOUND);
        }

        const transaction = await sequelize.transaction();

        try {
            const vacationDays = await this.vacationService.vacationDaysPerYear(
                vacationDaysPerYear,
                startDate,
                endDate
            );

            await this.calculateContractVacationDaysOnUser.update(
                contract,
                vacationDays,
                transaction
            );

            await contract.update(
                {
                    vacationDaysPerYear,
                    position,
                    startDate,
                    endDate,
                    userId,
                    vacationDays
                },
                { transaction }
            );

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();

            throw new Error(error);
        }

        const contractUpdated = await this.contractRepository.getById(id);

        return response.send(contractUpdated);
    }
}

module.exports = UpdateController;
