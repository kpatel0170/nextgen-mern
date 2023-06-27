const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes/routes');

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());

// secure apps by setting various HTTP headers
app.use(helmet());

// routes
app.use('/api', routes);

module.exports = app;
