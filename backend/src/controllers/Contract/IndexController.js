class IndexController {
    constructor(contractRepository) {
        this.contractRepository = contractRepository;
    }

    async invoke(request, response) {
        const contracts = await this.contractRepository.findAll();

        return response.send(contracts);
    }
}

module.exports = IndexController;
