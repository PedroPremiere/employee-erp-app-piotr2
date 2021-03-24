const express = require('express');

const router = express.Router();

router.use((req, res) => {
    return res.json({ patch: 'admin contract' });
});

module.exports = router;
