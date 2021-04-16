const { check, validationResult } = require('express-validator');

const isValidUser = require('./custom/isValidUser');
const isStartBeforeEnd = require('./custom/isStartBeforeEnd');

async function overlapingContracts(endDate, request) {
    const di = request.app.get('di');

    const contractRepository = di.get('repositories.contract');

    const { userId, startDate } = request.body;

    const contract = await contractRepository.findOneIncludesUserAndDataRange(
        userId,
        startDate,
        endDate
    );

    if (!contract) {
        return Promise.reject('User has no contract during this date');
    }
}

async function overlapingVacation(endDate, request) {
    const di = request.app.get('di');

    const vacationRepository = di.get('repositories.vacation');

    const { userId, startDate } = request.body;

    const vacation = await vacationRepository.findOneByOverlapingDateAndUser(
        userId,
        startDate,
        endDate
    );

    if (vacation) {
        return Promise.reject('vacation time overlaps with other vacations');
    }
}

const update = [
    check('startDate')
        .not()
        .isEmpty()
        .withMessage('Should not be empty')
        .isISO8601()
        .withMessage('Date must be in ISO8601 format(YYYY-MM-DD)')
        .bail()
        .custom((startDate, { req }) => isStartBeforeEnd(startDate, req)),

    check('endDate')
        .not()
        .isEmpty()
        .withMessage('Should not be empty')
        .isISO8601()
        .withMessage('Date must be in ISO8601 format(YYYY-MM-DD)')
        .bail()
        .custom((endDate, { req }) => overlapingContracts(endDate, req))
        .bail()
        .custom((endDate, { req }) => overlapingVacation(endDate, req)),

    check('userId')
        .not()
        .isEmpty()
        .withMessage('Should not be empty')
        .bail()
        .custom((userId, { req }) => isValidUser(userId, req))
];

module.exports = { update };
