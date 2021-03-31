const express = require('express');

const indexController = require('../controllers/Vacations/IndexController');
const storeController = require('../controllers/Vacations/StoreController');
const showController = require('../controllers/Vacations/ShowController');
const destroyController = require('../controllers/Vacations/DestroyController');
const updateController = require('../controllers/Vacations/UpdateController');
const router = express.Router();

router.get('/:id', showController.invoke);
router.get('/', indexController.invoke);
router.post('/', storeController.invoke);
router.delete('/:id', destroyController.invoke);
router.put('/:id', updateController.invoke);

module.exports = router;
