"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.isProduction = exports.prodEnvAliases = void 0;
const fs_1 = require("fs");
const dotenv_1 = require("dotenv");
const logger_1 = require("./logger");
const devEnvAliases = ['local', 'dev', 'development'];
exports.prodEnvAliases = ['prod', 'production', 'release'];
const isProduction = (env) => exports.prodEnvAliases.includes(env);
exports.isProduction = isProduction;
const envNames = ['test', ...devEnvAliases, 'sit', 'staging', ...exports.prodEnvAliases];
const getEnvFilename = (env) => {
    let filename = `.env.${env}`;
    if ((0, fs_1.existsSync)(filename)) {
        return filename;
    }
    if (devEnvAliases.includes(env)) {
        for (const devEnv of devEnvAliases) {
            filename = `.env.${devEnv}`;
            if ((0, fs_1.existsSync)(filename)) {
                return filename;
            }
        }
    }
    else if (exports.prodEnvAliases.includes(env)) {
        for (const prodEnv of exports.prodEnvAliases) {
            filename = `.env.${prodEnv}`;
            if ((0, fs_1.existsSync)(filename)) {
                return filename;
            }
        }
    }
    return undefined;
};
const config = () => {
    // if NODE_ENV not set, check .env file, if not exists throw error
    if (!process.env.NODE_ENV) {
        if (!(0, fs_1.existsSync)('.env')) {
            throw new Error('No env file found!');
        }
        return (0, dotenv_1.config)();
    }
    if (!envNames.includes(process.env.NODE_ENV)) {
        throw new Error(`NODE_ENV value should be one of ${envNames.map(e => `'${e}'`).join(', ')}`);
    }
    const envFilename = getEnvFilename(process.env.NODE_ENV);
    if (!envFilename) {
        logger_1.Logger.warn(`[WARNING] NODE_ENV specified (${process.env.NODE_ENV} but env file not found.\n Ignore this warning if intended`, logger_1.ELogLevel.DEBUG);
    }
    (0, dotenv_1.config)({ path: envFilename });
};
exports.config = config;
//# sourceMappingURL=env-config.js.map