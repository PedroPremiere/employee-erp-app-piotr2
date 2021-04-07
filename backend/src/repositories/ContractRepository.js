const AbstractRepository = require('./AbstractRepository');

class ContractRepository extends AbstractRepository {
    get model() {
        return this.db.Contract;
    }
}

module.exports = ContractRepository;
