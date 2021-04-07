const express = require('express');

const router = express.Router();

module.exports = di => {
    const indexController = di.get('controllers.vacations.indexController');
    const destroyController = di.get('controllers.vacations.destroyController');
    const showController = di.get('controllers.vacations.showController');
    const storeController = di.get('controllers.vacations.storeController');
    const updateController = di.get('controllers.vacations.updateController');

    router.get('/:id', (...args) => showController.invoke(...args));
    router.get('/', (...args) => indexController.invoke(...args));
    router.post('/', (...args) => storeController.invoke(...args));
    router.delete('/:id', (...args) => destroyController.invoke(...args));
    router.put('/:id', (...args) => updateController.invoke(...args));

    return router;
};
