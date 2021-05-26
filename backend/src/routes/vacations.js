const express = require('express');

const vacationValidator = require('../validators/vacationValidator');
const validate = require('../middlewares/validate');
const adminOnly = require('../middlewares/adminOnly');
const loggedIn = require('../middlewares/loggedIn');

const router = express.Router();

module.exports = di => {
    const indexController = di.get('controllers.vacations.indexController');
    const destroyController = di.get('controllers.vacations.destroyController');
    const showController = di.get('controllers.vacations.showController');
    const storeController = di.get('controllers.vacations.storeController');
    const updateController = di.get('controllers.vacations.updateController');

    router.get('/:id', [loggedIn], (...args) => showController.invoke(...args));
    router.get('/', [loggedIn], (...args) => indexController.invoke(...args));
    router.post(
        '/',
        [loggedIn],
        [vacationValidator.update, validate],
        (...args) => storeController.invoke(...args)
    );
    router.delete('/:id', [loggedIn], (...args) =>
        destroyController.invoke(...args)
    );
    router.put(
        '/:id',
        [loggedIn],
        [vacationValidator.update, validate],
        (...args) => updateController.invoke(...args)
    );

    return router;
};
