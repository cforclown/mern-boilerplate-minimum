"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_config_1 = require("./env-config");
const logger_1 = require("./logger");
const mockDotenvConfig = jest.fn();
jest.mock('dotenv', () => ({
    config: (args) => mockDotenvConfig(args)
}));
const mockFsExistsSync = jest.fn();
jest.mock('fs', () => ({
    existsSync: (filename) => mockFsExistsSync(filename)
}));
describe('env-config', () => {
    const mockEnvFiles = [
        '.env',
        '.env.test',
        '.env.local',
        '.env.dev',
        '.env.development',
        '.env.sit',
        '.env.staging',
        '.env.prod',
        '.env.production'
    ];
    mockFsExistsSync.mockImplementation((filename) => mockEnvFiles.includes(filename));
    const spyOnLoggerWarning = jest.spyOn(logger_1.Logger, 'warn');
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should throw error when NODE_ENV value is invalid', () => {
        process.env.NODE_ENV = 'invalid env value';
        expect(env_config_1.config).toThrowError();
    });
    it('should call dotenv config without providing NODE_ENV value', () => {
        process.env.NODE_ENV = '';
        (0, env_config_1.config)();
        expect(mockDotenvConfig).toHaveBeenCalledWith(undefined);
    });
    it('should call dotenv config with correct path for test NODE_ENV', () => {
        process.env.NODE_ENV = 'test';
        (0, env_config_1.config)();
        expect(mockDotenvConfig).toHaveBeenCalled();
        expect(mockDotenvConfig.mock.calls[0][0]).toEqual({ path: '.env.test' });
    });
    it('should call dotenv config with correct path for dev NODE_ENV', () => {
        process.env.NODE_ENV = 'dev';
        (0, env_config_1.config)();
        expect(mockDotenvConfig).toHaveBeenCalled();
        expect(mockDotenvConfig.mock.calls[0][0]).toEqual({ path: '.env.dev' });
    });
    it('should call dotenv config with correct path for dev NODE_ENV when only alias env filename exists', () => {
        const mockExistsFile = ['.env.local'];
        mockFsExistsSync.mockImplementationOnce((filename) => mockExistsFile.includes(filename));
        (0, env_config_1.config)();
        expect(mockDotenvConfig).toHaveBeenCalled();
        expect(mockDotenvConfig.mock.calls[0][0]).toEqual({ path: '.env.local' });
    });
    it('should throw error when .env file is not found and NODE_ENV is empty', () => {
        const mockExistsFile = [];
        mockFsExistsSync.mockImplementationOnce((filename) => mockExistsFile.includes(filename));
        process.env.NODE_ENV = '';
        expect(env_config_1.config).toThrowError('No env file found!');
    });
    it('should call dotenvConfig without path specified with warning message', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        mockFsExistsSync.mockImplementationOnce((_) => undefined);
        process.env.NODE_ENV = 'sit';
        (0, env_config_1.config)();
        expect(mockDotenvConfig).toHaveBeenCalledWith({ path: undefined });
        expect(spyOnLoggerWarning).toHaveBeenCalled();
    });
});
//# sourceMappingURL=env-config.test.js.map