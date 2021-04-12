const { StatusCodes } = require('http-status-codes');

module.exports = (request, response, next) => {
    const session = request.session;

    if (!session.isAdmin) {
        return response.sendStatus(StatusCodes.UNAUTHORIZED);
    }

    return next();
};
