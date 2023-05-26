const express = require('express');
const dotenv = require("dotenv");
dotenv.config();
const connect = require('./utils/connect');
var logger = require('./utils/logger');
const routes = require("./routes/routes");

const app = express();
app.use(express.json());

const port = process.env.PORT;
app.listen(port, async () => {
    logger.info(`Server listening on port ${port}`);

    await connect();
    routes(app);
});