const dotenv = require('dotenv');
const app = require('./app');
const connect = require('./config/connect');
const logger = require('./config/logger');

dotenv.config();

const port = process.env.PORT;

let server;

// Connect to MongoDB and start the server
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
