const express = require('express');
const helmet = require('helmet'); 
const cors = require('cors');
const config = require('./config'); 

const app = express();

app.use(helmet()); 
app.use(cors());

app.get('/', (req, res) => { 
    res.send("ERP Backend") 
}); 

app.listen(config.app.port);
