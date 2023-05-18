const express = require('express');
const dotenv = require("dotenv");
dotenv.config();
const connect = require('./utils/connect');
var logger = require('./utils/logger');

const app = express();

const port = process.env.PORT;
app.listen(port, async () => {
    logger.info(`Server listening on port ${port}`);

    await connect();
});