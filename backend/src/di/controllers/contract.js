module.exports = {
    services: {
        'controllers.contract.indexController': {
            class: '/controllers/Contract/IndexController',
            arguments: ['@repositories.contract']
        },
        'controllers.contract.destroyController': {
            class: '/controllers/Contract/DestroyController',
            arguments: [
                '@repositories.contract',
                '@services.calculateContractVacationDaysOnUser'
            ]
        },
        'controllers.contract.showController': {
            class: '/controllers/Contract/ShowController',
            arguments: ['@repositories.contract']
        },
        'controllers.contract.storeController': {
            class: '/controllers/Contract/StoreController',
            arguments: [
                '@repositories.contract',
                '@services.vacationDaysCalculator',
                '@services.calculateContractVacationDaysOnUser'
            ]
        },
        'controllers.contract.updateController': {
            class: '/controllers/Contract/UpdateController',
            arguments: [
                '@repositories.contract',
                '@services.vacationDaysCalculator',
                '@services.calculateContractVacationDaysOnUser'
            ]
        }
    }
};
