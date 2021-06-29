const { StatusCodes } = require('http-status-codes');
const sequelize = require('../../util/database');
const dayjs = require('dayjs');

class PasswordResetRequestController {
    constructor(
        userRepository,
        passwordResetTokenGeneratorHandler,
        sendMailHandler,
        templatePasswordResetRequest
    ) {
        this.userRepository = userRepository;
        this.passwordResetTokenGeneratorHandler =
            passwordResetTokenGeneratorHandler;
        this.sendMailHandler = sendMailHandler;
        this.templatePasswordResetRequest = templatePasswordResetRequest;
    }

    async invoke(request, response) {
        const { email } = request.body;
        const user = await this.userRepository.getByEmail(email);

        if (!user) {
            return response.sendStatus(StatusCodes.OK);
        }

        const passwordResetToken =
            await this.passwordResetTokenGeneratorHandler.handle();

        const passwordResetTokenExpiresAt = dayjs().add(1, 'day');

        await user.update({ passwordResetToken, passwordResetTokenExpiresAt });

        const message = this.templatePasswordResetRequest.generateMessage(
            user,
            passwordResetToken
        );

        await this.sendMailHandler.handle(
            user.email,
            message.subject,
            message.text,
            message.html
        );

        return response.sendStatus(StatusCodes.OK);
    }
}

module.exports = PasswordResetRequestController;
