const { StatusCodes } = require('http-status-codes');

class PasswordResetController {
    constructor(userRepository, passwordResetTokenGeneratorHandler) {
        this.userRepository = userRepository;
        this.passwordResetTokenGeneratorHandler =
            passwordResetTokenGeneratorHandler;
    }

    async invoke(request, response) {
        const {
            params: { passwordResetToken },
            body: { password }
        } = request;

        const user = await this.userRepository.findOne({
            where: { passwordResetToken }
        });

        if (!user) {
            return response.sendStatus(StatusCodes.NOT_FOUND);
        }

        const isTokenExpired = await user.isPasswordResetTokenExpired();

        if (isTokenExpired) {
            user.passwordResetTokenExpiresAt = null;
            user.passwordResetToken = null;

            return response.sendStatus(StatusCodes.NOT_FOUND);
        }

        await user.update({
            password,
            passwordResetToken: null,
            passwordResetTokenExpiresAt: null
        });

        return response.sendStatus(StatusCodes.OK);
    }
}

module.exports = PasswordResetController;
