const { StatusCodes } = require('http-status-codes');

class StoreController {
    constructor(userRepository, fileService) {
        this.userRepository = userRepository;
        this.fileService = fileService;
    }

    async invoke(request, response) {
        const {
            firstName,
            lastName,
            email,
            password,
            birthDate
        } = request.body;

        let avatarFilePath = null;

        if (request.files && request.files.avatar) {
            avatarFilePath = await this.fileService.save(request.files.avatar);
        }

        const user = await this.userRepository.create({
            firstName,
            lastName,
            email,
            password,
            birthDate,
            avatarFilePath
        });

        return response.status(StatusCodes.CREATED).send(user);
    }
}

module.exports = StoreController;
