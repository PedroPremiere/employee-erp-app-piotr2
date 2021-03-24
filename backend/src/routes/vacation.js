const express = require('express');

const router = express.Router();

router.use((req, res) => {
    return res.json({ patch: 'admin vacation' });
});

module.exports = router;
