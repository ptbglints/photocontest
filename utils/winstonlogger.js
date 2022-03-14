var appRoot = require('app-root-path');
var winston = require('winston');
// const { combine, timestamp, json, cli, errors } = winston.format;
const { combine, timestamp, prettyPrint, colorize,
    errors, json, cli, simple, align, printf } = winston.format;

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
        http: 'blue',
        info: 'green',
        warn: 'yellow',
        error: 'red'
    }
};

// define the custom settings for each transport (file, console)
var options = {
    file: {
        level: process.env.FILE_LOG_LEVEL || 'debug',
        filename: `${appRoot}/tmp/winston.log`,
        handleExceptions: true,
        handleRejections: true,
        json: true,
        maxsize: 1 * 1024 * 1024, // 1MB
        maxFiles: 1,
        colorize: false,
        format: combine(timestamp(), json()),
    },
    console: {
        levels: logLevels.levels,
        level: process.env.CONSOLE_LOG_LEVEL || 'debug',        
        handleExceptions: true,
        handleRejections: true,
        json: false,
        format: combine(
            colorize(),
            printf((info) => {
                const level = info.level
                const name = info.name || ''
                const code = info.code || ''
                const message = info.message || ''
                const stack = info.stack || ''
                if (stack) return `${level} ${name} ${code} ${message} ${stack} `
                return `${level} ${name} ${code} ${message}`
               }),           
        )
    }
};

winston.addColors(logLevels.colors);

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
    levels: logLevels.levels,
    level: process.env.GLOBAL_LOG_LEVEL || 'debug', // global level
    handleExceptions: true,
    exitOnError: false,
    // format: winston.format.json(),
    // format: winston.format.cli(),
    // format: combine(timestamp(), cli(), errors({ stack: true })),
    format: errors({ stack: true }),
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console),
    ],
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.streamingdarimorgan = {
    write: function (message, encoding) {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        message = message.trim()
        logger.http(message);
    },
};

module.exports = logger;
