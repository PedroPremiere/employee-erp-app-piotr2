// /admin/vacation
const express = require('express');

const router = express.Router();

// get /admin/vacation
router.use('/vacation', (req, res, next) => {
    return res.json({ patch: 'admin vacation' });
});

module.exports = router;
