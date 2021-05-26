class IndexController {
    constructor(vacationRepository) {
        this.vacationRepository = vacationRepository;
    }

    async invoke(request, response) {
        const {
            loggedUser,
            query: { userId }
        } = request;
        const where = {};
        const isAdmin = await loggedUser.isAdmin();

        if (!isAdmin) {
            where.userId = loggedUser.id;
        }

        if (userId && isAdmin) {
            where.userId = userId;
        }

        const vacations = await this.vacationRepository.findAll({
            where,
            include: [
                {
                    association: 'user',
                    attributes: ['lastName', 'firstName', 'email', 'id']
                }
            ]
        });

        return response.send(vacations);
    }
}

module.exports = IndexController;
