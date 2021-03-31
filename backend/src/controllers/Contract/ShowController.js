const { StatusCodes } = require('http-status-codes');
const { Contract } = require('../../models');

class ShowController {
    static async invoke(request, response) {
        const { id } = request.params;

        const contract = await Contract.findByPk(id);

        if (!contract) {
            return response.sendStatus(StatusCodes.NOT_FOUND);
        }

        return response.send(contract);
    }
}

module.exports = ShowController;
