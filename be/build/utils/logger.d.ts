export declare const COLOR_FORMAT: {
    RESET: string;
    BRIGHT: string;
    DIM: string;
    UNDERSCORE: string;
    BLINK: string;
    REVERSE: string;
    HIDDEN: string;
    FG_BLACK: string;
    FG_RED: string;
    FG_GREEN: string;
    FG_YELLOW: string;
    FG_BLUE: string;
    FG_MAGENTA: string;
    FG_CYAN: string;
    FG_WHITE: string;
    BG_BLACK: string;
    BG_RED: string;
    BG_GREEN: string;
    BG_YELLOW: string;
    BG_BLUE: string;
    BG_MAGENTA: string;
    BG_CYAN: string;
    BG_WHITE: string;
    TextRed: string;
    TextGreen: string;
    TextYellow: string;
    TextBlue: string;
    TextMagenta: string;
    TextCyan: string;
    TextError: string;
    BgGreen: string;
    BgBlue: string;
    BgYellow: string;
    BgMagenta: string;
    BgCyan: string;
    BgWhite: string;
};
export declare enum ELogLevel {
    TEST = 0,
    ERROR = 1,
    DEBUG = 2,
    PRODUCTION = 4
}
export declare class Logger {
    private static ENV_LOG_LEVEL;
    static shouldPrint(logLevel?: ELogLevel): boolean;
    static print(color: string, text: any, logLevel?: ELogLevel): void;
    static info(log: any, logLevel?: ELogLevel): void;
    static success(log: any, logLevel?: ELogLevel): void;
    static warn(log: any, logLevel?: ELogLevel): void;
    static danger(log: any, logLevel?: ELogLevel): void;
    static error(log: any, logLevel?: ELogLevel): void;
    static exception(err: Error): void;
}
