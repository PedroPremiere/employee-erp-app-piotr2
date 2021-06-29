const { StatusCodes } = require('http-status-codes');

class UpdateController {
    constructor(userRepository, authService) {
        this.userRepository = userRepository;
        this.authService = authService;
    }

    async invoke(request, response) {
        const {
            body: { firstName, lastName, email, birthDate, password },
            loggedUser
        } = request;

        const user = await this.userRepository.findById(loggedUser.id);

        if (!user) {
            return response.sendStatus(StatusCodes.NOT_FOUND);
        }

        const userPassword = await this.userRepository.getPassword(
            loggedUser.id
        );

        if (
            !(await this.authService.comparePasswords(password, userPassword))
        ) {
            return response.sendStatus(StatusCodes.FORBIDDEN);
        }

        await user.update({
            firstName,
            lastName,
            email,
            birthDate
        });

        const userUpdated = await this.userRepository.findById(loggedUser.id);

        return response.send(userUpdated);
    }
}

module.exports = UpdateController;
