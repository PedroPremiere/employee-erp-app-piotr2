const { StatusCodes } = require('http-status-codes');
const { Contract } = require('../../models');

class DestroyController {
    static async invoke(request, response) {
        const { id } = request.params;

        await Contract.destroy({
            where: {
                id
            }
        });

        return response.sendStatus(StatusCodes.NO_CONTENT);
    }
}

module.exports = DestroyController;
