const { StatusCodes } = require('http-status-codes');

const { Contract } = require('../../models');

class UpdateController {
    static async invoke(request, response) {
        const { position, startDate, endDate, userId } = request.body;
        const { id } = request.params;

        const contract = await Contract.findByPk(id);

        if (!contract) {
            return response.sendStatus(StatusCodes.NOT_FOUND);
        }

        await contract.update({ position, startDate, endDate, userId });

        const contractUpdated = await Contract.findByPk(id);

        return response.send(contractUpdated);
    }
}

module.exports = UpdateController;
