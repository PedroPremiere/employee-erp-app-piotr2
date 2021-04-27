const express = require('express');

const userValidator = require('../validators/userValidator');
const validate = require('../middlewares/validate');
const adminOnly = require('../middlewares/adminOnly');
const loggedIn = require('../middlewares/loggedIn');

const router = express.Router();

module.exports = di => {
    const indexController = di.get('controllers.users.indexController');
    const destroyController = di.get('controllers.users.destroyController');
    const showController = di.get('controllers.users.showController');
    const storeController = di.get('controllers.users.storeController');
    const updateController = di.get('controllers.users.updateController');

    router.get('/', [loggedIn, adminOnly], (...args) =>
        indexController.invoke(...args)
    );
    router.post('/', [userValidator.store, validate], (...args) =>
        storeController.invoke(...args)
    );
    router.delete('/:id', [loggedIn, adminOnly], (...args) =>
        destroyController.invoke(...args)
    );
    router.get('/:id', [loggedIn, adminOnly], (...args) =>
        showController.invoke(...args)
    );
    router.put(
        '/:id',
        [loggedIn, adminOnly],
        [userValidator.update, validate],
        (...args) => updateController.invoke(...args)
    );

    return router;
};
