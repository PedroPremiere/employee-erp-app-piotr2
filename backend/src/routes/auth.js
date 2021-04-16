const express = require('express');

const validate = require('../middlewares/validate');
const authValidator = require('../validators/authValidator');

const router = express.Router();

module.exports = di => {
    const loginController = di.get('controllers.auth.loginController');
    const logoutController = di.get('controllers.auth.logoutController');

    router.post('/login', [authValidator.login, validate], (...args) =>
        loginController.invoke(...args)
    );
    router.post('/logout', (...args) => logoutController.invoke(...args));

    return router;
};
