class AbstractRepository {
    constructor(db) {
        this.db = db;
    }

    findAll(options = {}) {
        return this.model.findAll(options);
    }

    findById(id, options = {}) {
        return this.model.findByPk(id, options);
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
