class MeController {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async invoke(request, response) {
        const { loggedUser } = request;
        loggedUser.isAdmin = await loggedUser.isAdmin();

        return response.send(loggedUser);
    }
}

module.exports = MeController;
