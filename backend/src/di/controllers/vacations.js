module.exports = {
    services: {
        'controllers.vacations.indexController': {
            class: '/controllers/Vacations/IndexController',
            arguments: ['@repositories.vacation']
        },
        'controllers.vacations.destroyController': {
            class: '/controllers/Vacations/DestroyController',
            arguments: [
                '@repositories.vacation',
                '@repositories.user',
                '@services.vacationDurationCalculator'
            ]
        },
        'controllers.vacations.showController': {
            class: '/controllers/Vacations/ShowController',
            arguments: ['@repositories.vacation']
        },
        'controllers.vacations.storeController': {
            class: '/controllers/Vacations/StoreController',
            arguments: [
                '@repositories.vacation',
                '@repositories.user',
                '@services.vacationDurationCalculator'
            ]
        },
        'controllers.vacations.updateController': {
            class: '/controllers/Vacations/UpdateController',
            arguments: [
                '@repositories.vacation',
                '@repositories.user',
                '@services.vacationDurationCalculator'
            ]
        }
    }
};
