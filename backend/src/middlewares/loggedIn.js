const { StatusCodes } = require('http-status-codes');

module.exports = async (request, response, next) => {
    const { session } = request;

    if (!(session && session.userId)) {
        return response.sendStatus(StatusCodes.UNAUTHORIZED);
    }

    const di = request.app.get('di');
    const userRepository = di.get('repositories.user');

    const user = await userRepository.findById(session.userId);

    if (!user) {
        return response.sendStatus(StatusCodes.UNAUTHORIZED);
    }

    request.loggedUser = user;

    return next();
};
