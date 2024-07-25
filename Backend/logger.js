const pino = require('pino');
const pinoPretty = require('pino-pretty');
const path = require('path');

const logFilePath = path.join(__dirname, 'logs', 'logs.json');

const logger = pino(
    {
        transport: {
            target: 'pino-pretty',
            options: {
                destination: logFilePath, // Output to logs.json file in the logs folder inside the backend folder
                mkdir: true, // Create the directory if it doesn't exist
                colorize: true, // Colorize the output for better readability
            },
        },
    },
);

module.exports = logger;
