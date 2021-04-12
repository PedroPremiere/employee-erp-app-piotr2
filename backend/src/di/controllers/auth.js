module.exports = {
    services: {
        'controllers.auth.loginController': {
            class: '/controllers/Auth/LoginController',
            arguments: ['@repositories.user', '@services.auth']
        },
        'controllers.auth.logoutController': {
            class: '/controllers/Auth/LogoutController'
        }
    }
};
