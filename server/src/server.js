// import https from "https";
// import { readFileSync } from "fs";
import app from "./app.js";

import connectDB from "./config/connectDB.js";
import logger from "./config/logger.js";
import config from "./config/config.js";

let server;
const isProduction = config.env === "production";

connectDB()
  .then(() => {
    if (isProduction) {
      app.listen(config.port, () =>
        logger.info(`Server started on port ${config.port}`)
      );
    } else {
      // const httpsOptions = {
      //   key: readFileSync(resolve(__dirname, '../security/cert.key')),
      //   cert: readFileSync(resolve(__dirname, '../security/cert.pem')),
      // };

      server = app.listen(config.port, () => {
        logger.info(`HTTPS server running at ${config.port}`);
        // import all_routes from 'express-list-endpoints';
        // console.log(all_routes(app));
      });
    }
  })
  .catch((e) => {
    logger.error(e);
    process.exit(1);
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(`Error: ${error}`);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
