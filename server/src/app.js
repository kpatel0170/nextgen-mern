const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const connect = require('./utils/connect');
var logger = require('./config/logger');
const routes = require('./routes/routes');

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT;
app.listen(port, async () => {
  logger.info(`Server listening on port ${port}`);

  await connect();
  routes(app);
});
