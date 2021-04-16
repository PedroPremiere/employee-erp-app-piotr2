module.exports = async (userId, request) => {
    const di = request.app.get('di');

    const userRepository = di.get('repositories.user');

    const user = await userRepository.findById(userId);

    if (!user) {
        return Promise.reject('User doesnt exist');
    }
};
