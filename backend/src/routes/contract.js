const express = require('express');
const indexController = require('../controllers/Contract/IndexController');
const router = express.Router();

router.get('/', indexController.getAll);
module.exports = router;
