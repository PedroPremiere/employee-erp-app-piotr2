const express = require('express');

const validate = require('../middlewares/validate');
const AuthValidator = require('../validators/AuthValidator');

const router = express.Router();

module.exports = di => {
    const loginController = di.get('controllers.auth.loginController');
    const logoutController = di.get('controllers.auth.logoutController');

    router.post('/login', [AuthValidator.login, validate], (...args) =>
        loginController.invoke(...args)
    );
    router.post('/logout', (...args) => logoutController.invoke(...args));

    return router;
};
