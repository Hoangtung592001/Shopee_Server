"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app/app.module");
const _config_1 = require("./config");
const log4js_1 = require("log4js");
require("./helpers/logger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['log', 'error', 'warn', 'debug', 'verbose'],
        cors: true,
    });
    await app.listen(_config_1.default.SERVER_PORT);
    (0, log4js_1.getLogger)().info(`Server is running on port ${_config_1.default.SERVER_PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map