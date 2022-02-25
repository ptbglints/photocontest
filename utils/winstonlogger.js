var appRoot = require('app-root-path');
var winston = require('winston');
const { combine, timestamp, json, cli } = winston.format;

const logLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6
    },
    colors: {
        foo: 'blue',
        bar: 'green',
        baz: 'yellow',
        foobar: 'red'
    }
};

// define the custom settings for each transport (file, console)
var options = {
    file: {
        level: 'http',
        filename: `${appRoot}/tmp/winston.log`,
        handleExceptions: true,
        json: true,
        maxsize: 1 * 1024 * 1024, // 1MB
        maxFiles: 1,
        colorize: false,
        format: combine(timestamp(), json()),
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
        format: cli(),
    },
};

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
    levels: logLevels.levels,  
    level: process.env.LOG_LEVEL || 'debug', // global level
    // format: winston.format.json(),
    // format: winston.format.cli(),
    format: combine(timestamp(), json()),
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console),
    ],
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.streamingdarimorgan = {
    write: function (message, encoding) {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        logger.info(message.trim());
    },
};

module.exports = logger;
