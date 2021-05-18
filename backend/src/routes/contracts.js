const express = require('express');

const contractValidator = require('../validators/contractValidator');
const validate = require('../middlewares/validate');
const adminOnly = require('../middlewares/adminOnly');
const loggedIn = require('../middlewares/loggedIn');

const router = express.Router();

module.exports = di => {
    const indexController = di.get('controllers.contract.indexController');
    const destroyController = di.get('controllers.contract.destroyController');
    const showController = di.get('controllers.contract.showController');
    const storeController = di.get('controllers.contract.storeController');
    const updateController = di.get('controllers.contract.updateController');

    router.get('/:id', (...args) => showController.invoke(...args));
    router.get('/', [loggedIn], (...args) => indexController.invoke(...args));
    router.post(
        '/',
        [loggedIn, adminOnly],
        [contractValidator.update, validate],
        (...args) => storeController.invoke(...args)
    );
    router.delete('/:id', [loggedIn, adminOnly], (...args) =>
        destroyController.invoke(...args)
    );
    router.put(
        '/:id',
        [loggedIn, adminOnly],
        [contractValidator.update, validate],
        (...args) => updateController.invoke(...args)
    );

    return router;
};
