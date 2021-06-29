const { check } = require('express-validator');

async function isMailTaken(email, request, exludeId) {
    let userId;

    if (exludeId == 'params') {
        userId = request.params.id;
    } else if (exludeId == 'request') {
        userId = request.loggedUser.id;
    }

    const di = request.app.get('di');
    const userRepository = di.get('repositories.user');

    const user = await userRepository.getByEmail(email);

    if (user && user.id !== userId) {
        return Promise.reject('E-mail already in use');
    }
}

const basic = [
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

    check('birthDate')
        .not()
        .isEmpty()
        .withMessage('Should not be empty')
        .isISO8601()
        .withMessage('Date must be in ISO8601 format(YYYY-MM-DD)')
];

const withPassword = [
    check('password')
        .not()
        .isEmpty()
        .withMessage('Should not be empty')
        .isLength({ min: 8 })
        .withMessage('Password must have more than 8 characters')
];

const update = [
    ...basic,
    check('email')
        .not()
        .isEmpty()
        .withMessage('Should not be empty')
        .isEmail()
        .withMessage('Mail not valid')
        .bail()
        .custom((email, { req }) => isMailTaken(email, req, 'params'))
];

const profile = [
    ...basic,
    ...withPassword,
    check('email')
        .not()
        .isEmpty()
        .withMessage('Should not be empty')
        .isEmail()
        .withMessage('Mail not valid')
        .bail()
        .custom((email, { req }) => isMailTaken(email, req, 'request'))
];

const store = [...update, ...withPassword];

module.exports = { update, store, profile };
