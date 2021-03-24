require('dotenv').config();

module.exports = {
    app: {
        port: process.env.APP_PORT
    },
    database: {
        db: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        host: process.env.DATABASE_HOST,
        dialect: process.env.DATABASE_DIALECT,
        port: process.env.DATABASE_PORT || 3306
    }
};
