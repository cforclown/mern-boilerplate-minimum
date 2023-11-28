"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.ELogLevel = exports.COLOR_FORMAT = void 0;
/* eslint no-console: [ "off" ] */
const lodash_1 = require("lodash");
const environment_1 = require("./environment");
exports.COLOR_FORMAT = {
    // output control
    RESET: '\x1b[0m',
    BRIGHT: '\x1b[1m',
    DIM: '\x1b[2m',
    UNDERSCORE: '\x1b[4m',
    BLINK: '\x1b[5m',
    REVERSE: '\x1b[7m',
    HIDDEN: '\x1b[8m',
    // font color (foreground)
    FG_BLACK: '\x1b[30m',
    FG_RED: '\x1b[31m',
    FG_GREEN: '\x1b[32m',
    FG_YELLOW: '\x1b[33m',
    FG_BLUE: '\x1b[34m',
    FG_MAGENTA: '\x1b[35m',
    FG_CYAN: '\x1b[36m',
    FG_WHITE: '\x1b[37m',
    // background color
    BG_BLACK: '\x1b[40m',
    BG_RED: '\x1b[41m',
    BG_GREEN: '\x1b[42m',
    BG_YELLOW: '\x1b[43m',
    BG_BLUE: '\x1b[44m',
    BG_MAGENTA: '\x1b[45m',
    BG_CYAN: '\x1b[46m',
    BG_WHITE: '\x1b[47m',
    TextRed: '\x1b[31m%s\x1b[0m',
    TextGreen: '\x1b[32m%s\x1b[0m',
    TextYellow: '\x1b[33m%s\x1b[0m',
    TextBlue: '\x1b[34m%s\x1b[0m',
    TextMagenta: '\x1b[35m%s\x1b[0m',
    TextCyan: '\x1b[36m%s\x1b[0m',
    TextError: '\x1b[30m\x1b[41m%s\x1b[0m',
    BgGreen: '\x1b[30m\x1b[42m%s\x1b[0m',
    BgBlue: '\x1b[30m\x1b[44m%s\x1b[0m',
    BgYellow: '\x1b[30m\x1b[43m%s\x1b[0m',
    BgMagenta: '\x1b[30m\x1b[45m%s\x1b[0m',
    BgCyan: '\x1b[30m\x1b[46m%s\x1b[0m',
    BgWhite: '\x1b[30m\x1b[47m%s\x1b[0m'
};
var ELogLevel;
(function (ELogLevel) {
    ELogLevel[ELogLevel["TEST"] = 0] = "TEST";
    ELogLevel[ELogLevel["ERROR"] = 1] = "ERROR";
    ELogLevel[ELogLevel["DEBUG"] = 2] = "DEBUG";
    ELogLevel[ELogLevel["PRODUCTION"] = 4] = "PRODUCTION";
})(ELogLevel = exports.ELogLevel || (exports.ELogLevel = {}));
function stringify(value) {
    return (0, lodash_1.isString)(value) ? value : JSON.stringify(value);
}
class Logger {
    static shouldPrint(logLevel) {
        if (!this.ENV_LOG_LEVEL) {
            this.ENV_LOG_LEVEL = environment_1.Environment.getLogLevel();
        }
        if ((0, lodash_1.isNil)(logLevel)) {
            if (this.ENV_LOG_LEVEL === ELogLevel.DEBUG) {
                return true;
            }
            return false;
        }
        return logLevel <= this.ENV_LOG_LEVEL;
    }
    static print(color, text, logLevel) {
        if (!this.shouldPrint(logLevel)) {
            return;
        }
        console.log(color, stringify(text));
    }
    static info(log, logLevel) {
        this.print(exports.COLOR_FORMAT.TextBlue, log, logLevel);
    }
    static success(log, logLevel) {
        this.print(exports.COLOR_FORMAT.TextGreen, log, logLevel);
    }
    static warn(log, logLevel) {
        this.print(exports.COLOR_FORMAT.TextYellow, log, logLevel);
    }
    static danger(log, logLevel) {
        this.print(exports.COLOR_FORMAT.TextRed, log, logLevel);
    }
    static error(log, logLevel) {
        this.print(exports.COLOR_FORMAT.TextError, log, logLevel);
    }
    static exception(err) {
        this.error('=========================================');
        try {
            this.danger(`Error message: ${err.message}`, ELogLevel.ERROR);
            if (err.stack) {
                this.danger('STACKTRACE ----------------------------->', ELogLevel.ERROR);
                this.danger(err.stack);
                this.danger('-----------------------------------------', ELogLevel.ERROR);
            }
        }
        catch (err) {
            if (err instanceof Error) {
                this.error(err.message);
            }
        }
        this.error('=========================================');
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map