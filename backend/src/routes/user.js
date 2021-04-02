const express = require('express');

const indexController = require('../controllers/Users/IndexController');
const storeController = require('../controllers/Users/StoreController');
const showController = require('../controllers/Users/ShowController');
const destroyController = require('../controllers/Users/DestroyController');
const updateController = require('../controllers/Users/UpdateController');

const UserValidator = require('../validators/UserValidator');
const validate = require('../middlewares/validate');

const router = express.Router();

router.get('/', indexController.invoke);
router.post('/', [UserValidator.store, validate], storeController.invoke);
router.delete('/:id', destroyController.invoke);
router.get('/:id', showController.invoke);
router.put('/:id', [UserValidator.update, validate], updateController.invoke);

module.exports = router;
