const { check, validationResult } = require('express-validator');

const isValidUser = require('./custom/isValidUser');
const isStartBeforeEnd = require('./custom/isStartBeforeEnd');

async function overlapingContracts(endDate, request) {
    const di = request.app.get('di');
    const contractRepository = di.get('repositories.contract');

    const { userId, startDate } = request.body;
    const { id } = request.params;

    const contract = await contractRepository.findOneByOverlapingDateAndUser(
        userId,
        startDate,
        endDate
    );

    if (contract && contract.id !== id) {
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
        .custom((endDate, { req }) => overlapingContracts(endDate, req)),

    check('vacationDaysPerYear')
        .not()
        .isEmpty()
        .withMessage('Vacation days per year should not be empty')
];

module.exports = { update };
