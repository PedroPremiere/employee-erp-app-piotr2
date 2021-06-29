const express = require('express');

const validate = require('../middlewares/validate');
const authValidator = require('../validators/authValidator');
const loggedIn = require('../middlewares/loggedIn');
const userValidator = require('../validators/userValidator');
const passwordValidator = require('../validators/passwordValidator');
const mailValidator = require('../validators/mailValidator');

const router = express.Router();

module.exports = di => {
    const loginController = di.get('controllers.auth.loginController');
    const logoutController = di.get('controllers.auth.logoutController');
    const meController = di.get('controllers.auth.meController');
    const profileUpdateController = di.get(
        'controllers.auth.ProfileController'
    );
    const passwordResetRequestController = di.get(
        'controllers.auth.passwordResetRequestController'
    );
    const passwordResetController = di.get(
        'controllers.auth.passwordResetController'
    );

    router.post('/login', [authValidator.login, validate], (...args) =>
        loginController.invoke(...args)
    );
    router.post('/logout', [loggedIn], (...args) =>
        logoutController.invoke(...args)
    );
    router.get('/me', [loggedIn], (...args) => meController.invoke(...args));

    router.put(
        '/profile',
        [loggedIn],
        [userValidator.profile, validate],
        (...args) => profileUpdateController.invoke(...args)
    );
    router.post('/password-reset/', [mailValidator.mail, validate], (...args) =>
        passwordResetRequestController.invoke(...args)
    );
    router.post(
        '/password-reset/:passwordResetToken',
        [passwordValidator.password, validate],
        (...args) => passwordResetController.invoke(...args)
    );

    return router;
};
