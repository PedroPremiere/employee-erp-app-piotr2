module.exports = {
    services: {
        'services.auth': {
            class: 'services/Auth'
        },
        'services.file': {
            class: 'services/File'
        },
        'services.vacationDaysCalculator': {
            class: 'services/ContractVacationDaysCalculator'
        },
        'services.calculateContractVacationDaysOnUser': {
            class: 'services/CalculateContractVacationDaysOnUser',
            arguments: [
                '@repositories.contract',
                '@repositories.user',
                '@services.vacationDaysCalculator'
            ]
        },
        'services.vacationDurationCalculator': {
            class: 'services/VacationDurationCalculator'
        }
    }
};
