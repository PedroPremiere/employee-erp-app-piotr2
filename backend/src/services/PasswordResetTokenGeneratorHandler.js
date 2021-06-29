const { randomBytes } = require('crypto');

class PasswordResetTokenGeneratorHandler {
    handle() {
        return randomBytes(36).toString('hex');
    }
}

module.exports = PasswordResetTokenGeneratorHandler;
