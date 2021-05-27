const { StatusCodes } = require('http-status-codes');
const sequelize = require('../../util/database');

class DestroyController {
    constructor(contractRepository, calculateContractVacationDaysOnUser) {
        this.contractRepository = contractRepository;
        this.calculateContractVacationDaysOnUser =
            calculateContractVacationDaysOnUser;
    }

    async invoke(request, response) {
        const { id } = request.params;

        const contract = await this.contractRepository.findById(id);

        if (!contract) {
            return response.sendStatus(StatusCodes.NO_CONTENT);
        }

        const transaction = await sequelize.transaction();

        try {
            await this.calculateContractVacationDaysOnUser.delete(
                contract,
                transaction
            );
            await contract.destroy({ transaction });

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();

            throw new Error(error);
        }
        return response.sendStatus(StatusCodes.NO_CONTENT);
    }
}

module.exports = DestroyController;
