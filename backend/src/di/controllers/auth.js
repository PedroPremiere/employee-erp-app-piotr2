module.exports = {
    services: {
        'controllers.auth.loginController': {
            class: '/controllers/Auth/LoginController',
            arguments: ['@repositories.user', '@services.auth']
        },
        'controllers.auth.logoutController': {
            class: '/controllers/Auth/LogoutController'
        },
        'controllers.auth.meController': {
            class: '/controllers/Auth/MeController',
            arguments: ['@repositories.user']
        },
        'controllers.auth.passwordChangeController': {
            class: '/controllers/Auth/PasswordChangeController',
            arguments: ['@repositories.user', '@services.auth']
        },
        'controllers.auth.ProfileController': {
            class: '/controllers/Auth/ProfileUpdateController',

            arguments: ['@repositories.user', '@services.auth']
        },
        'controllers.auth.passwordResetRequestController': {
            class: '/controllers/Auth/PasswordResetRequestController',
            arguments: [
                '@repositories.user',
                '@services.passwordResetTokenGeneratorHandler',
                '@services.sendMailHandler',
                '@templates.mail.passwordResetRequest'
            ]
        },
        'controllers.auth.passwordResetController': {
            class: '/controllers/Auth/PasswordResetController',
            arguments: [
                '@repositories.user',
                '@services.passwordResetTokenGeneratorHandler'
            ]
        }
    }
};
