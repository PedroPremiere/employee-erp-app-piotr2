const { check, validationResult } = require('express-validator');

const isValidUser = require('./custom/isValidUser');
const isStartBeforeEnd = require('./custom/isStartBeforeEnd');

async function isNotDuringContract(endDate, request) {
    const di = request.app.get('di');
    const contractRepository = di.get('repositories.contract');

    const { loggedUser } = request;
    const isAdmin = await loggedUser.isAdmin();
    const { userId, startDate } = request.body;
    let userIdQuery;

    if (isAdmin) {
        userIdQuery = userId;
    } else {
        userIdQuery = loggedUser.id;
    }

    const contract = await contractRepository.findOneIncludesUserAndDataRange(
        userIdQuery,
        startDate,
        endDate
    );

    if (!contract) {
        return Promise.reject('User has no contract during this date');
    }
}

async function isOverlapingVacation(endDate, request) {
    const di = request.app.get('di');
    const vacationRepository = di.get('repositories.vacation');

    const { userId, startDate } = request.body;
    const { id } = request.params;
    const { loggedUser } = request;
    const isAdmin = await loggedUser.isAdmin();
    let userIdQuery;

    if (isAdmin) {
        userIdQuery = userId;
    } else {
        userIdQuery = loggedUser.id;
    }

    const vacation = await vacationRepository.findOneByOverlapingDateAndUser(
        userIdQuery,
        startDate,
        endDate
    );

    if (vacation && vacation.id !== id) {
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
        .custom((endDate, { req }) => isNotDuringContract(endDate, req))
        .bail()
        .custom((endDate, { req }) => isOverlapingVacation(endDate, req)),

    check('userId')
        .optional({ nullable: true })
        .custom((userId, { req }) => isValidUser(userId, req)),

    check('isConfirmed').optional({ nullable: true })
];

module.exports = { update };
