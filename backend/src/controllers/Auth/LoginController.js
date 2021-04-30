const { StatusCodes } = require('http-status-codes');

class LoginController {
    constructor(userRepository, authService) {
        this.userRepository = userRepository;
        this.auth = authService;
    }

    async invoke(request, response) {
        const { email, password } = request.body;

        const user = await this.userRepository.getByEmail(email, {
            include: [
                {
                    association: 'roles',
                    attributes: ['name', 'id'],
                    through: { attributes: [] }
                }
            ]
        });

        if (!user) {
            return response.sendStatus(StatusCodes.UNAUTHORIZED);
        }

        const userPassword = await this.userRepository.getPassword(user.id);

        if (await this.auth.checkCredentials(password, userPassword)) {
            request.session.userId = user.id;

            return response.send(user);
        }

        return response.sendStatus(StatusCodes.UNAUTHORIZED);
    }
}

module.exports = LoginController;
