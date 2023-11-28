"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
describe('logger', () => {
    process.env.LOG_LEVEL = 'debug';
    const consoleSpy = jest.spyOn(console, 'log');
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should print text in blue color when calling info()', () => {
        logger_1.Logger.info('test');
        expect(consoleSpy).toHaveBeenCalledWith(logger_1.COLOR_FORMAT.TextBlue, 'test');
    });
    it('should print text in green color when calling success()', () => {
        logger_1.Logger.success('test');
        expect(consoleSpy).toHaveBeenCalledWith(logger_1.COLOR_FORMAT.TextGreen, 'test');
    });
    it('should print text in yellow color when calling warn()', () => {
        logger_1.Logger.warn('test');
        expect(consoleSpy).toHaveBeenCalledWith(logger_1.COLOR_FORMAT.TextYellow, 'test');
    });
    it('should not print if shouldPrint() returns false', () => {
        logger_1.Logger.shouldPrint = jest.fn().mockReturnValue(false);
        logger_1.Logger.print(logger_1.COLOR_FORMAT.TextBlue, 'test');
        expect(consoleSpy).not.toHaveBeenCalled();
    });
    it('should print if shouldPrint() returns true', () => {
        logger_1.Logger.shouldPrint = jest.fn().mockReturnValue(true);
        logger_1.Logger.print(logger_1.COLOR_FORMAT.TextBlue, 'test');
        expect(consoleSpy).toHaveBeenCalledWith(logger_1.COLOR_FORMAT.TextBlue, 'test');
    });
    it('should print text as string if it is a string', () => {
        logger_1.Logger.shouldPrint = jest.fn().mockReturnValue(true);
        logger_1.Logger.print(logger_1.COLOR_FORMAT.TextBlue, 'test');
        expect(consoleSpy).toHaveBeenCalledWith(logger_1.COLOR_FORMAT.TextBlue, 'test');
    });
    it('should print error message and stack trace when calling exception()', () => {
        const error = new Error('Test Error');
        error.stack = 'Test Stack Trace';
        logger_1.Logger.exception(error);
        expect(consoleSpy).toHaveBeenCalledWith(logger_1.COLOR_FORMAT.TextRed, `Error message: ${error.message}`);
        expect(consoleSpy).toHaveBeenCalledWith(logger_1.COLOR_FORMAT.TextRed, error.stack);
    });
});
//# sourceMappingURL=logger.test.js.map