export declare const prodEnvAliases: string[];
export declare const isProduction: (env: string) => boolean;
declare const envNames: readonly ["test", ...string[]];
export type EnvNames = typeof envNames[number];
export declare const config: () => any;
export {};
