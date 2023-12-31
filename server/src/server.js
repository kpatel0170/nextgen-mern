// import https from "https";
// import { readFileSync } from "fs";
import { createTerminus } from "@godaddy/terminus";
import http from "node:http";
import app from "./libs/express.js";

import connectDB from "./libs/connectDB.js";
import logger from "./libs/logger.js";
import config from "./config/config.js";

const { port } = config;
const isProduction = config.env === "production";

const server = http.createServer(app);

export default async function main() {
  try {
    await startServer();
  } catch (err) {
    logger.error("No server", err);
    process.exit(1);
  }
}

async function startServer() {
  // // Init mongoose connection(s)
  // const db = await mongoose.connect();

  // // Init agenda.ts scheduler
  // await agenda.init();

  // // Initialize express
  // const app = await express.init(db.admin as Mongoose);

  // // Create a new HTTP server
  // logger.info('Creating HTTP Server');
  // const server = http.createServer(app);

  // // Initialize socket.io
  // await socketio.init(server, db.admin as Mongoose);

  setupErrorHandling();
  await connectDB();

  createTerminus(server, {
    onSignal,
    onShutdown,
    logger: (msg, err) => logger.error({ msg, err }),
    healthChecks: {
      "/health": onHealthCheck,
      __unsafeExposeStackTraces: !isProduction
    }
  });

  server.listen(port, onListening);
}

function onListening() {
  logger.info({ msg: `listening on http://localhost:${port}`, port });
}

async function onSignal() {
  logger.info("server is starting cleanup");
  database
    .disconnect()
    .then(() => logger.info("database disconnected"))
    .catch((err) => logger.error({ err, msg: "error during disconnection" }));
}

async function onShutdown() {
  logger.info("cleanup finished, server is shutting down");
}

async function onHealthCheck() {
  await database.ping();
}

function setupErrorHandling() {
  process.on("unhandledRejection", (err, promise) => {
    logger.error({ err, msg: `Unhandled Rejection at: ${promise}` });
    // send error to your error tracking software here
    process.exit(1);
  });

  process.on("uncaughtException", (err, origin) => {
    logger.error({
      err,
      msg: `Uncaught Exception: ${err.message} at: ${origin}`
    });
    // send error to your error tracking software here
    process.exit(1);
  });
}
