class IndexController {
    constructor(contractRepository) {
        this.contractRepository = contractRepository;
    }

    async invoke(request, response) {
        const contracts = await this.contractRepository.findAll({
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
