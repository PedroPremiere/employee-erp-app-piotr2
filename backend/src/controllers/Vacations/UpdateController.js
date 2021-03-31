const { StatusCodes } = require('http-status-codes');
const { Vacation } = require('../../models');

class UpdateController {
    static async invoke(request, response) {
        const { startDate, endDate, userId } = request.body;
        const { id } = request.params;

        const vacation = await Vacation.findByPk(id);

        if (!vacation) {
            return response.sendStatus(StatusCodes.NOT_FOUND);
        }

        try {
            await vacation.update({ startDate, endDate, userId });

            const vacationUpdated = await Vacation.findByPk(id);

            return response.send(vacationUpdated);
        } catch {
            return response.sendStatus(StatusCodes.SERVICE_UNAVAILABLE);
        }
    }
}

module.exports = UpdateController;
