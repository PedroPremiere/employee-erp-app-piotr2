const { check, validationResult } = require('express-validator');

async function isStartBeforeEnd(startDate, request) {
    const { endDate } = request.body;

    if (startDate > endDate) {
        return Promise.reject('Start Date must be before end');
    }
}

async function isValidUser(userId, request) {
    const di = request.app.get('di');

    const userRepository = di.get('repositories.user');

    const user = await userRepository.findById(userId);

    if (!user) {
        return Promise.reject('User doesnt exist');
    }
}

async function overlapingContracts(endDate, request) {
    const di = request.app.get('di');

    const contractRepository = di.get('repositories.contract');

    const { userId, startDate } = request.body;

    const contract = await contractRepository.findContractbyUserInDataRange(
        userId,
        startDate,
        endDate
    );

    if (contract) {
        return Promise.reject('Contract time overlaps with other contracts');
    }
}

const update = [
    check('position')
        .not()
        .isEmpty()
        .withMessage('Should not be empty')
        .isLength({ min: 2 })
        .withMessage('Position must have more than 2 characters'),

    check('startDate')
        .not()
        .isEmpty()
        .withMessage('Should not be empty')
        .isISO8601()
        .withMessage('Date must be in ISO8601 format(YYYY-MM-DD)')
        .bail()
        .custom((startDate, { req }) => isStartBeforeEnd(startDate, req)),

    check('userId')
        .not()
        .isEmpty()
        .withMessage('Should not be empty')
        .bail()
        .custom((userId, { req }) => isValidUser(userId, req)),

    check('endDate')
        .not()
        .isEmpty()
        .withMessage('Should not be empty')
        .isISO8601()
        .withMessage('Date must be in ISO8601 format(YYYY-MM-DD)')
        .bail()
        .custom((endDate, { req }) => overlapingContracts(endDate, req))
];

module.exports = { update };
