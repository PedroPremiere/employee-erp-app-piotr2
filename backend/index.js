const express = require('express');
require('express-async-errors');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

const config = require('./config');

const di = require('./src/di');

const errorHandler = require('./src/plugins/errorHandler');
const routes = require('./src/routes')(di);

const sequelize = require('./src/util/database');

const app = express();

const threeHoursInMs = 3600 * 1000 * 3;

app.use(helmet());

const originsWhitelist = [config.app.frontendUrl];

app.use(
    cors({
        origin(origin, callback) {
            if (originsWhitelist.includes(origin) || !origin) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: config.session.secret,
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: threeHoursInMs
        }
    })
);

app.use(routes);
app.use(errorHandler);

app.set('session', session);
app.set('di', di);

sequelize
    .sync()
    .then(result => {
        app.listen(config.app.port);
    })
    .catch(err => {
        console.log(err);
    });
