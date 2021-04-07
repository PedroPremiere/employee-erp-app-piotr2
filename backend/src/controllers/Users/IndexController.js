class IndexController {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async invoke(request, response) {
        const users = await this.userRepository.getAll();

        return response.send(users);
    }
}

module.exports = IndexController;
