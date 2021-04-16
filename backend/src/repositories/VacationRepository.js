const AbstractIntervalRepository = require('./AbstractIntervalRepository');

class VacationRepository extends AbstractIntervalRepository {
    get model() {
        return this.db.Vacation;
    }
}

module.exports = VacationRepository;
