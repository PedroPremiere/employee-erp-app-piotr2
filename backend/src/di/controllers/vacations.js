module.exports = {
    services: {
        'controllers.vacations.indexController': {
            class: '/controllers/Vacations/IndexController',
            arguments: ['@repositories.user']
        },
        'controllers.vacations.destroyController': {
            class: '/controllers/Vacations/DestroyController',
            arguments: ['@repositories.user']
        },
        'controllers.vacations.showController': {
            class: '/controllers/Vacations/ShowController',
            arguments: ['@repositories.user']
        },
        'controllers.vacations.storeController': {
            class: '/controllers/Vacations/StoreController',
            arguments: ['@repositories.user']
        },
        'controllers.vacations.updateController': {
            class: '/controllers/Vacations/UpdateController',
            arguments: ['@repositories.user']
        }
    }
};
