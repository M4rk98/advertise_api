const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
var cors = require('cors');

const affiliatesRouter = require('./routes/affiliates');
const authenticationRouter = require('./routes/authentication');

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/affiliates', affiliatesRouter);
app.use('/login', authenticationRouter);


module.exports = app;
