const express = require('express');
const indexController = require('../controllers/Contract/IndexController');
const storeController = require('../controllers/Contract/StoreController');
const showController = require('../controllers/Contract/ShowController');
const destroyController = require('../controllers/Contract/DestroyController');
const updateController = require('../controllers/Contract/UpdateController');
const router = express.Router();

router.get('/:id', showController.invoke);
router.get('/', indexController.invoke);
router.post('/', storeController.invoke);
router.delete('/:id', destroyController.invoke);
router.put('/:id', updateController.invoke);

module.exports = router;
