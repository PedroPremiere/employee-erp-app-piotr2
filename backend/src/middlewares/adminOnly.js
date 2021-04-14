const { StatusCodes } = require('http-status-codes');

module.exports = async (request, response, next) => {
    const { loggedUser } = request;

    if (!(loggedUser && (await loggedUser.isAdmin()))) {
        return response.sendStatus(StatusCodes.FORBIDDEN);
    }

    return next();
};
