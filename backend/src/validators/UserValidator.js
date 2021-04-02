const { check, validationResult } = require('express-validator');
const { User } = require('../models');

async function isMailTaken(email, request) {
    const { id } = request.params;

    const user = await User.findOne({ where: { email } });

    if (user && user.id !== id) {
        return Promise.reject('E-mail already in use');
    }
}

const update = [
    check('firstName')
        .not()
        .isEmpty()
        .withMessage('Should not be empty')
        .isLength({ min: 2 })
        .withMessage('First Name must have more than 2 characters'),

    check('lastName')
        .not()
        .isEmpty()
        .withMessage('Should not be empty')
        .isLength({ min: 2 })
        .withMessage('Last Name must have more than 2 characters'),

    check('email')
        .not()
        .isEmpty()
        .withMessage('Should not be empty')
        .isEmail()
        .withMessage('Mail not valid')
        .bail()
        .custom((email, { req }) => isMailTaken(email, req)),

    check('birthDate')
        .not()
        .isEmpty()
        .withMessage('Should not be empty')
        .isISO8601()
        .withMessage('Date must be in ISO8601 format(YYYY-MM-DD)')
];

const store = [
    ...update,
    check('password')
        .not()
        .isEmpty()
        .withMessage('Should not be empty')
        .isLength({ min: 8 })
        .withMessage('Password must have more than 8 characters')
];

module.exports = { update, store };
