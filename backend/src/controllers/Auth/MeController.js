const { StatusCodes } = require('http-status-codes');

class MeController {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async invoke(request, response) {
        const { loggedUser } = request;

        return response.send(loggedUser);
    }
}

module.exports = MeController;
