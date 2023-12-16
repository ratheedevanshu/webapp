const winston = require("winston");
const { combine, timestamp, printf, colorize, label } = winston.format;
const config = require("../config");
const moment = require("moment");
let currentDate = moment(new Date()).format("DD-MM-YYYY");




var logger = winston.createLogger({
  level: config.LOG_LEVEL,
  format: combine(
	colorize({ all: true }),
    // label({ label: process.env.NODE_ENV }),
    timestamp(),
	printf((info) => `[${info.timestamp}] [${info.label}] [${info.level}] ${info.message}`)
  ),
  transports: [new winston.transports.Console()],
  exitOnError: false,
});



module.exports = logger;

module.exports.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};
