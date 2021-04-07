const { StatusCodes } = require('http-status-codes');

const { Contract } = require('../../models');

class StoreController {
    async invoke(request, response) {
        const { position, startDate, endDate, userId } = request.body;

        const contract = await Contract.create({
            position,
            startDate,
            endDate,
            userId
        });

        return response.status(StatusCodes.CREATED).send(contract);
    }
}

module.exports = StoreController;
