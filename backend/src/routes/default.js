const express = require('express');

const router = express.Router();

router.use((req, res) => {
    return res.send({ message: 'API is working' });
});

module.exports = router;
