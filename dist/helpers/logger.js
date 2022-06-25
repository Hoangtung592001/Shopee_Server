"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js_1 = require("log4js");
(0, log4js_1.configure)({
    appenders: {
        console: {
            type: 'console',
        },
        errorFile: {
            type: 'dateFile',
            filename: 'logs/error.log',
            keepFileExt: true,
        },
        errors: {
            type: 'logLevelFilter',
            level: 'ERROR',
            appender: 'errorFile',
        },
    },
    categories: {
        default: { appenders: ['console', 'errors'], level: 'debug' },
    },
});
//# sourceMappingURL=logger.js.map