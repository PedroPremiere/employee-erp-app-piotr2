class AbstractRepository {
    constructor(db) {
        this.db = db;
    }

    findAll() {
        return this.model.findAll();
    }

    findById(id) {
        return this.model.findByPk(id);
    }

    create(options = {}) {
        return this.model.create(options);
    }

    delete(id) {
        this.model.destroy({
            where: {
                id
            }
        });
    }
}

module.exports = AbstractRepository;
