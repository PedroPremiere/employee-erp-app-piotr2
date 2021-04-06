const { StatusCodes } = require('http-status-codes');

class ShowController {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async invoke(request, response) {
        const { id } = request.params;

        const user = await this.userRepository.getById(id);

        if (!user) {
            return response.sendStatus(StatusCodes.NOT_FOUND);
        }

        return response.send(user);
    }
}
module.exports = ShowController;
