// /admin/contract
const express = require('express');

const router = express.Router();

// get /admin/contract
router.use('/contract', (req, res, next) => {
    return res.json({ patch: 'admin contract' });
});

module.exports = router;
