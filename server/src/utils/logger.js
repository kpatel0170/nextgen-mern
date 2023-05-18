const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  transports: [
    new transports.Console({
      format: combine(
        colorize(), // Colorize the log output
        timestamp(),
        myFormat
      )
    }),
    new transports.File({ filename: 'logs.log' })
  ]
});

module.exports = logger;
