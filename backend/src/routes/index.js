const express = require('express');
const fs = require('fs');

const router = express.Router();

fs.readdirSync(__dirname).forEach(function (route) {
    route = route.split('.')[0];

    if (route === 'index') {
        return;
    }
    if (route === 'default') {
        return;
    }
    router.use(`/${route}`, require(`./${route}`));
});
router.use('/', require('./default'));
module.exports = router;
