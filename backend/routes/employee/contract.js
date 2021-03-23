// /employee/contract
const express = require('express');

const router = express.Router();

// get /employee/contract
router.use('/contract', (req, res, next) => {
    return res.json({ patch: 'employee contacts' });
});

module.exports = router;
