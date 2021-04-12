const { StatusCodes } = require('http-status-codes');

class LogoutController {
    async invoke(request, response) {
        const session = request.session;

        session.destroy();

        return response.sendStatus(StatusCodes.OK);
    }
}

module.exports = LogoutController;
