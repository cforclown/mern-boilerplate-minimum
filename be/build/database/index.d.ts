declare class Database {
    static readonly INSTANCE_NAME = "database";
    constructor();
    connect(): Promise<void>;
    close(): void;
    registerModels(): void;
}
export default Database;
