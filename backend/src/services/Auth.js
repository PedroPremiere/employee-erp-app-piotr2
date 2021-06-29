const bcrypt = require('bcryptjs');

class Auth {
    comparePasswords(password, dbPassword) {
        return bcrypt.compare(password, dbPassword);
    }
}

module.exports = Auth;
