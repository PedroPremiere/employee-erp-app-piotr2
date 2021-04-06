const express = require('express');

const UserRepository = require('../repositories/UserRepository');
const UserValidator = require('../validators/UserValidator');
const validate = require('../middlewares/validate');

const userRepository = new UserRepository();

const indexController = new (require('../controllers/Users/IndexController'))(
    userRepository
);
const storeController = new (require('../controllers/Users/StoreController'))(
    userRepository
);
const showController = new (require('../controllers/Users/ShowController'))(
    userRepository
);
const destroyController = new (require('../controllers/Users/DestroyController'))(
    userRepository
);
const updateController = new (require('../controllers/Users/UpdateController'))(
    userRepository
);

const router = express.Router();

router.get('/', (...args) => indexController.invoke(...args));
router.post('/', [UserValidator.store, validate], (...args) =>
    storeController.invoke(...args)
);
router.delete('/:id', (...args) => destroyController.invoke(...args));
router.get('/:id', (...args) => showController.invoke(...args));
router.put('/:id', [UserValidator.update, validate], (...args) =>
    updateController.invoke(...args)
);

module.exports = router;
