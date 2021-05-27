class CalculateContractVacationDaysOnUser {
    constructor(contractRepository, userRepository, vacationService) {
        this.contractRepository = contractRepository;
        this.userRepository = userRepository;
        this.vacationService = vacationService;
    }

    async update(contract, vacationDays, transaction) {
        const user = await this.userRepository.findById(contract.userId);

        const newUserVacationDays =
            parseInt(user.vacationDays) -
            parseInt(contract.vacationDays) +
            parseInt(vacationDays);

        await user.update(
            { vacationDays: newUserVacationDays },
            { transaction }
        );
    }

    async create(contract, vacationDays, transaction) {
        const user = await this.userRepository.findById(contract.userId);

        const newUserVacationDays =
            parseInt(user.vacationDays) + parseInt(vacationDays);

        await user.update(
            { vacationDays: newUserVacationDays },
            { transaction }
        );
    }

    async delete(contract, transaction) {
        const user = await this.userRepository.findById(contract.userId);

        const newUserVacationDays =
            parseInt(user.vacationDays) - parseInt(contract.vacationDays);

        await user.update(
            { vacationDays: newUserVacationDays },
            { transaction }
        );
    }
}

module.exports = CalculateContractVacationDaysOnUser;
