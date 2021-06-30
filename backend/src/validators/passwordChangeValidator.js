const { check } = require('express-validator');

const passwordChange = [
    check('currentPassword')
        .not()
        .isEmpty()
        .withMessage('Should not be empty')
        .isLength({ min: 8 })
        .withMessage('Current password must have more than 8 characters'),

    check('password')
        .not()
        .isEmpty()
        .withMessage('Should not be empty')
        .isLength({ min: 8 })
        .withMessage('Password must have more than 8 characters'),

    check('passwordConfirmation')
        .not()
        .isEmpty()
        .custom(
            (
                value,
                {
                    req: {
                        body: { password }
                    }
                }
            ) => value === password
        )
        .withMessage(
            'passwordConfirmation and Password Repeat must be the same'
        )
];

module.exports = { passwordChange };
