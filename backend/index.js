const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const config = require('./config');

const employeeContactRoutes = require('./routes/employee/contract');
const employeeVacationRoutes = require('./routes/employee/vacation');

const adminContractRoutes = require('./routes/admin/contract');
const adminEmployeeRoutes = require('./routes/admin/employee');
const adminVacationRoutes = require('./routes/admin/vacation');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/employee', employeeContactRoutes);
app.use('/employee', employeeVacationRoutes);

app.use('/admin', adminContractRoutes);
app.use('/admin', adminEmployeeRoutes);
app.use('/admin', adminVacationRoutes);

app.get('/', (req, res) => {
    return res.json({ patch: 'main route' });
});

app.listen(config.app.port);
