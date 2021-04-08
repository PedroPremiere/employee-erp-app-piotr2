const express = require('express');

const ContractValidator = require('../validators/ContractValidator');
const validate = require('../middlewares/validate');

const router = express.Router();

module.exports = di => {
    const indexController = di.get('controllers.contract.indexController');
    const destroyController = di.get('controllers.contract.destroyController');
    const showController = di.get('controllers.contract.showController');
    const storeController = di.get('controllers.contract.storeController');
    const updateController = di.get('controllers.contract.updateController');

    router.get('/:id', (...args) => showController.invoke(...args));
    router.get('/', (...args) => indexController.invoke(...args));
    router.post('/', [ContractValidator.update, validate], (...args) =>
        storeController.invoke(...args)
    );
    router.delete('/:id', (...args) => destroyController.invoke(...args));
    router.put('/:id', [ContractValidator.update, validate], (...args) =>
        updateController.invoke(...args)
    );

    return router;
};
