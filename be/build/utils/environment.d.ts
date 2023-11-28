import { ELogLevel } from './logger';
import { EnvNames } from './env-config';
export declare function getEnvOrThrow(varName: string): string;
export declare const Environment: {
    getNodeEnv: () => EnvNames;
    getLogLevel: () => ELogLevel;
    getPort: () => string;
    getAllowedOrigins: () => string[];
    getApiVersion: () => string;
    getDBConnectionString: () => string;
    getSessionSecret: () => string;
    getAccessTokenSecret: () => string;
    getRefreshTokenSecret: () => string;
    getAccessTokenExpIn: () => number;
    getRefreshTokenExpIn: () => string;
    getEncryptionAlgorithm: () => string;
    getEncryptionKey: () => string;
};
