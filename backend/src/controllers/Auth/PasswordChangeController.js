const { StatusCodes } = require('http-status-codes');

class PasswordChangeController {
    constructor(userRepository, authService) {
        this.userRepository = userRepository;
        this.auth = authService;
    }

    async invoke(request, response) {
        const {
            body: { password, currentPassword },
            loggedUser
        } = request;

        const user = await this.userRepository.findById(loggedUser.id, {
            attributes: {
                include: ['password']
            }
        });

        if (
            !(await this.auth.comparePasswords(currentPassword, user.password))
        ) {
            return response.status(StatusCodes.BAD_REQUEST).send({
                errors: [
                    {
                        message: 'Wrong current password',
                        param: 'currentPassword'
                    }
                ]
            });
        }

        await user.update({ password });

        return response.sendStatus(StatusCodes.OK);
    }
}

module.exports = PasswordChangeController;
