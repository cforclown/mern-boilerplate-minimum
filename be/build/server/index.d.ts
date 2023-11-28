export default class Server {
    static readonly INSTANCE_NAME: string;
    private readonly db;
    private readonly app;
    private readonly sioController;
    constructor();
    start(): Promise<void>;
}
