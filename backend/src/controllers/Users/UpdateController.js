const { StatusCodes } = require('http-status-codes');

class UpdateController {
    constructor(userRepository, fileService) {
        this.userRepository = userRepository;
        this.fileService = fileService;
    }

    async invoke(request, response) {
        const { firstName, lastName, email, admin, birthDate } = request.body;
        let { avatarFilePath } = request.body;

        const { id } = request.params;

        const user = await this.userRepository.findById(id);

        if (!user) {
            return response.sendStatus(StatusCodes.NOT_FOUND);
        }

        if (request.files && request.files.avatar) {
            if (user.avatarFilePath) {
                this.fileService.delete(user.avatarFilePath);
            }

            avatarFilePath = await this.fileService.save(request.files.avatar);
        }

        await user.update({
            firstName,
            lastName,
            email,
            admin,
            birthDate,
            avatarFilePath
        });

        const userUpdated = await this.userRepository.findById(id);

        return response.send(userUpdated);
    }
}

module.exports = UpdateController;
