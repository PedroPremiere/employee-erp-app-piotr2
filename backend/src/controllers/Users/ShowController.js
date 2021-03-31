const { StatusCodes } = require('http-status-codes');
const { User } = require('../../models');

class ShowController {
    static async invoke(request, response) {
        const { id } = request.params;

        const user = await User.findByPk(id);

        if (!user) {
            return response.sendStatus(StatusCodes.NOT_FOUND);
        }

        return response.send(user);
    }
}
module.exports = ShowController;
