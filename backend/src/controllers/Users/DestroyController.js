const { StatusCodes } = require('http-status-codes');
const { User } = require('../../models');

class DestroyController {
    static async invoke(request, response) {
        const { id } = request.params;

        await User.destroy({
            where: {
                id
            }
        });

        return response.sendStatus(StatusCodes.NO_CONTENT);
    }
}

module.exports = DestroyController;
