const { StatusCodes } = require('http-status-codes');
const { Vacation } = require('../../models');

class DestroyController {
    async invoke(request, response) {
        const { id } = request.params;

        await Vacation.destroy({
            where: {
                id
            }
        });

        return response.sendStatus(StatusCodes.NO_CONTENT);
    }
}

module.exports = DestroyController;
