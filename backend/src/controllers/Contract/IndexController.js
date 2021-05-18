class IndexController {
    constructor(contractRepository) {
        this.contractRepository = contractRepository;
    }

    async invoke(request, response) {
        const { userIdQuery } = request.query;
        const where = {};
        const { loggedUser } = request;
        const isAdmin = await loggedUser.isAdmin();

        if (!isAdmin) {
            where.userId = loggedUser.id;
        }

        if (userIdQuery && isAdmin) {
            where.userId = userIdQuery;
        }

        const contracts = await this.contractRepository.findAll({
            where,
            include: [
                {
                    association: 'user',
                    attributes: ['lastName', 'firstName', 'email', 'id']
                }
            ]
        });

        return response.send(contracts);
    }
}

module.exports = IndexController;
