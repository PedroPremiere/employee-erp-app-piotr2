const { check } = require('express-validator');

const mail = [
    check('email')
        .not()
        .isEmpty()
        .withMessage('Should not be empty')
        .isEmail()
        .withMessage('Mail not valid')
];

module.exports = { mail };
