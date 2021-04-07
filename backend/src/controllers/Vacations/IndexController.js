class IndexController {
    constructor(vacationRepository) {
        this.vacationRepository = vacationRepository;
    }

    async invoke(request, response) {
        const vacations = await this.vacationRepository.findAll();

        return response.send(vacations);
    }
}

module.exports = IndexController;
