module.exports = {
    services: {
        'controllers.vacations.indexController': {
            class: '/controllers/Vacations/IndexController',
            arguments: ['@repositories.vacation']
        },
        'controllers.vacations.destroyController': {
            class: '/controllers/Vacations/DestroyController',
            arguments: ['@repositories.vacation']
        },
        'controllers.vacations.showController': {
            class: '/controllers/Vacations/ShowController',
            arguments: ['@repositories.vacation']
        },
        'controllers.vacations.storeController': {
            class: '/controllers/Vacations/StoreController',
            arguments: ['@repositories.vacation']
        },
        'controllers.vacations.updateController': {
            class: '/controllers/Vacations/UpdateController',
            arguments: ['@repositories.vacation']
        }
    }
};
