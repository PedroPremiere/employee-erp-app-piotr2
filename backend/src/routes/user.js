const express = require('express');

const indexController = require('../controllers/Users/IndexController');
const storeController = require('../controllers/Users/StoreController');
const showController = require('../controllers/Users/ShowController');
const destroyController = require('../controllers/Users/DestroyController');
const updateController = require('../controllers/Users/UpdateController');

const router = express.Router();

router.get('/', indexController.invoke);
router.post('/', storeController.invoke);
router.delete('/:id', destroyController.invoke);
router.get('/:id', showController.invoke);
router.put('/:id', updateController.invoke);

module.exports = router;
