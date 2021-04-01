const express = require('express');
require('express-async-errors');
const helmet = require('helmet');
const cors = require('cors');
const config = require('./config');

const errorHandler = require('./src/plugins/errorHandler');
const routes = require('./src/routes');
const sequelize = require('./src/util/database');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.use(errorHandler);

sequelize
    .sync()
    .then(result => {
        app.listen(config.app.port);
    })
    .catch(err => {
        console.log(err);
    });
