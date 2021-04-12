const bcrypt = require('bcryptjs');

class Auth {
    checkCredentials(password, dbPassword) {
        return bcrypt.compare(password, dbPassword);
    }
}

module.exports = Auth;
