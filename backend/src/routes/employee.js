const express = require('express');

const employeeRoutes = express.Router();

employeeRoutes.use((req, res) => {
    return res.json({ patch: 'admin employee' });
});

module.exports = employeeRoutes;
