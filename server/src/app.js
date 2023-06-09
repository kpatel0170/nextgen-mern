const express = require('express');
const cors = require('cors');
const logger = require('./config/logger');
const routes = require('./routes/routes');

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());

// routes
app.use('/api', routes);

module.exports = app;
