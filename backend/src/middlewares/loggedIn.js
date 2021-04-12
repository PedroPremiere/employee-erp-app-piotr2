const { StatusCodes } = require('http-status-codes');

module.exports = (request, response, next) => {
    const session = request.session;

    if (!(session && session.user)) {
        return response.sendStatus(StatusCodes.UNAUTHORIZED);
    }

    return next();
};
