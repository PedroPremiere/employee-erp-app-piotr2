const { StatusCodes } = require('http-status-codes');
const { Vacation } = require('../../models');

class StoreController {
    static async invoke(request, response) {
        const { startDate, endDate, userId } = request.body;

        const vacation = await Vacation.create({
            startDate,
            endDate,
            userId
        });

        return response.status(StatusCodes.CREATED).send(vacation);
    }
}

module.exports = StoreController;
