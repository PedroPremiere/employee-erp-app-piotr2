const AbstractRepository = require('./AbstractRepository');

class VacationRepository extends AbstractRepository {
    get model() {
        return this.db.Vacation;
    }
}

module.exports = VacationRepository;
