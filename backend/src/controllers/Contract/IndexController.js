class IndexController {
    constructor(contractRepository) {
        this.contractRepository = contractRepository;
    }

    async invoke(request, response) {
        const { userId } = request.query;
        const where = {};

        if (userId) {
            where.userId = userId;
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
