import { Express } from 'express';
import Database from '../database';
import { container } from '../di-config';
import { Environment, Logger } from '../utils';

export default class Server {
  public static readonly INSTANCE_NAME: string = 'server';

  private readonly db: Database;
  private readonly app: Express;

  constructor () {
    this.db = container.resolve('database');
    this.app = container.resolve('app');
  }

  async start (): Promise<void> {
    try {
      Logger.success('============================================================================');
      Logger.success(`| ${Environment.getNodeEnv().toUpperCase()} MODE`);
      await this.db.connect();
      Logger.success('| ✅ SUCCESSFULLY CONNECTED TO THE DATABASE');

      const port = Environment.getPort();
      await this.app.listen(port);

      Logger.success(`| ⚡ SERVER STARTED SUCCESSFULLY [${port}]`);
      Logger.success('============================================================================');
    } catch (err) {
      if (err instanceof Error) {
        Logger.error(err.message);
      }
    }
  }
}
