const { StatusCodes } = require('http-status-codes');
const { Vacation } = require('../../models');

class ShowController {
    async invoke(request, response) {
        const { id } = request.params;

        const vacation = await Vacation.findByPk(id);

        if (!vacation) {
            return response.sendStatus(StatusCodes.NOT_FOUND);
        }

        return response.send(vacation);
    }
}

module.exports = ShowController;
