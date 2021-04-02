const { StatusCodes } = require('http-status-codes');
const { User } = require('../../models');

class UpdateController {
    static async invoke(request, response) {
        const { firstName, lastName, email, admin, birthDate } = request.body;
        const { id } = request.params;

        const user = await User.findByPk(id);

        if (!user) {
            return response.sendStatus(StatusCodes.NOT_FOUND);
        }

        await user.update({
            firstName,
            lastName,
            email,
            admin,
            birthDate
        });

        const userUpdated = await User.findByPk(id);

        return response.send(userUpdated);
    }
}

module.exports = UpdateController;
