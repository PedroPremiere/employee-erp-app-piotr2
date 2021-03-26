require('dotenv').config();

const env = (key, defaultValue = null) => process.env[key] || defaultValue;
const isEnabled = key => env(key) && env(key) === 'true';

module.exports = {
    app: {
        port: process.env.APP_PORT
    },
    db: {
        url: `mysql://${env('DATABASE_USERNAME')}:${env(
            'DATABASE_PASSWORD'
        )}@${env('DATABASE_HOST', 'localhost')}:${env(
            'DATABASE_PORT',
            3306
        )}/${env('DATABASE_NAME')}`,
        database: env('DATABASE_NAME'),
        username: env('DATABASE_USERNAME'),
        password: env('DATABASE_PASSWORD'),
        host: env('DATABASE_HOST', 'localhost'),
        dialect: env('DATABASE_DIALECT'),
        port: env('DATABASE_PORT', 3306),
        logging: isEnabled('SEQUELIZE_LOGGING') ? console.log : false,
        define: {
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci',
            timestamps: false
        }
    }
};
