// /employee/vacation
const express = require('express');

const router = express.Router();

// get /employee/vacation
router.use('/vacation', (req, res, next) => {
    return res.json({ patch: 'employee ' });
});

module.exports = router;
