// import fs from "fs";
import os from "os";
import cluster from "cluster";
import { createLogger, format, transports } from "winston";
import moment from "moment-timezone";

// const timezone = "North America/New_York";
let timestamp = "North America/Regina";

const getHostAndProcessInfo = () =>
  `[${os.hostname()} ${
    cluster.isWorker ? `WORKER #${cluster.worker.id}` : "MASTER"
  }]`;

const logColors = {
  debug: "white",
  data: "grey",
  error: "red",
  help: "cyan",
  info: "green",
  input: "grey",
  prompt: "grey",
  silly: "magenta",
  warn: "cyan",
  verbose: "cyan"
};

const localFormat = format.combine(
  format.colorize({
    colors: logColors,
    message: true
  }),
  format.timestamp(),
  format.prettyPrint(),
  format.printf(({ level, message }) => {
    timestamp = moment().format("YYYY.MM.DD HH:mm:ss");
    return `[${timestamp}] ${level
      .toUpperCase()
      .trim()} ${getHostAndProcessInfo()} ${message}`;
  })
);

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.simple(),
    format.printf(({ level, message }) => {
      timestamp = moment().format("DD.MM.YYYY HH:mm:ss");
      return `[${timestamp}] ${level
        .toUpperCase()
        .padEnd(8)} ${getHostAndProcessInfo()} ${message}`;
    })
  ),
  transports: [
    new transports.Console({
      format: localFormat,
      name: "log-console",
      level: "debug",
      handleExceptions: true
    }),
    new transports.File({ filename: "src/server.log" })
  ],
  exitOnError: false
});

export default logger;
