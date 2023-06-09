const app = require('./app');
const connect = require('./utils/connect');
const logger = require('./config/logger');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT;

let server;
connect()
  .then(() => {
    server = app.listen(port, () => {
      logger.info(`Server listening on port ${port}`);
    });
  })
  .catch((e) => {
    logger.error(e);
    process.exit(1);
  });
