const { check } = require('express-validator');

const password = [
    check('password')
        .not()
        .isEmpty()
        .withMessage('Should not be empty')
        .isLength({ min: 8 })
        .withMessage('Password must have more than 8 characters'),
    check('passwordRepeat')
        .not()
        .isEmpty()
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Password and Password Repeat must be the same')
];

module.exports = { password };
