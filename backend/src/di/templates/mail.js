const config = require('../../../config');
module.exports = {
    parameters: {
        config
    },

    services: {
        'templates.mail.passwordResetRequest': {
            class: '/templates/mail/PasswordResetRequest',
            arguments: ['%config%']
        }
    }
};
