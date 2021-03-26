const express = require('express');

const indexController = require('../controllers/Vacations/IndexController');

const router = express.Router();

router.get('/', indexController.getAll);
module.exports = router;
