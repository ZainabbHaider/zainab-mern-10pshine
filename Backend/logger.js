const pino = require('pino');
const pinoPretty = require('pino-pretty');

const logger = pino(
    {
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true, // Colorize the output for better readability
            },
        },
    },
);

module.exports = logger;
