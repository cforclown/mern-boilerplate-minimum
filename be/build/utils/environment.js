"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = exports.getEnvOrThrow = void 0;
const logger_1 = require("./logger");
function getEnvOrThrow(varName) {
    const value = process.env[varName];
    if (!value) {
        throw new Error(`Environment variable ${varName} not set!`);
    }
    return value;
}
exports.getEnvOrThrow = getEnvOrThrow;
function getOptionalEnv(varName, defaultValue) {
    const value = process.env[varName];
    if (!value) {
        return defaultValue;
    }
    return value;
}
exports.Environment = {
    getNodeEnv: () => getEnvOrThrow('NODE_ENV'),
    getLogLevel: () => {
        const logLevel = getOptionalEnv('LOG_LEVEL', 'prod');
        if (!logLevel) {
            return logger_1.ELogLevel.PRODUCTION;
        }
        switch (logLevel) {
            case 'test':
                return logger_1.ELogLevel.TEST;
            case 'error':
                return logger_1.ELogLevel.ERROR;
            case 'debug':
                return logger_1.ELogLevel.DEBUG;
            case 'prod':
                return logger_1.ELogLevel.PRODUCTION;
            default:
                return logger_1.ELogLevel.PRODUCTION;
        }
    },
    getPort: () => getEnvOrThrow('PORT'),
    getAllowedOrigins: () => {
        const appHost = getEnvOrThrow('ALLOWED_ORIGINS');
        return appHost.split(',').filter(h => !!h);
    },
    getApiVersion: () => getOptionalEnv('API_VERSION', 'v1'),
    getDBConnectionString: () => getEnvOrThrow('DB_CONN_STR'),
    getSessionSecret: () => getOptionalEnv('SESSION_SECRET', 'mern-boilerplate-session-secret'),
    getAccessTokenSecret: () => getEnvOrThrow('ACCESS_TOKEN_SECRET'),
    getRefreshTokenSecret: () => getEnvOrThrow('REFRESH_TOKEN_SECRET'),
    getAccessTokenExpIn: () => {
        const accessTokenExpIn = getOptionalEnv('ACCESS_TOKEN_EXP_IN', 7200);
        return typeof accessTokenExpIn === 'string' ? parseInt(accessTokenExpIn) : accessTokenExpIn;
    },
    getRefreshTokenExpIn: () => '7d',
    getEncryptionAlgorithm: () => getOptionalEnv('ENCRYPTION_ALGORITHM', 'aes-256-cbc'),
    getEncryptionKey: () => getEnvOrThrow('ENCRYPTION_KEY')
};
//# sourceMappingURL=environment.js.map