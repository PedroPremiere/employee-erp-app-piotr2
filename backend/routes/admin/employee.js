// /admin/employee
const express = require('express');

const router = express.Router();

// get /admin/employee
router.use('/employee', (req, res, next) => {
    return res.json({ patch: 'admin employee' });
});

module.exports = router;
