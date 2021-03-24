const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const config = require('./config');

const routes = require('./src/routes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.get('/', (req, res) => {
    return res.json('API is working');
});

app.listen(config.app.port);
