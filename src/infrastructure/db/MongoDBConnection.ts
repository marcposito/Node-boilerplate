import { MongoClient, Db } from 'mongodb';

class MongoDBConnection {
  private callbacks: any = {};

  client: MongoClient;
  db: Db;

  async connect(uri: string, database: string, options: object = {}): Promise<void> {
    if (this.db === undefined) {
      this.client = new MongoClient(uri, options);

      try {
        await this.client.connect();

        this.db = this.client.db(database);

        // Set listeners
        this.db.on('error', (err): void => { this.executeCallbacks('error', [err]); });
        this.db.on('timeout', (err): void => { this.executeCallbacks('error', [err]); });
        this.db.on('close', (err): void => { this.executeCallbacks('disconnected', [err]); });
        this.db.on('parseError', (err): void => { this.executeCallbacks('error', [err]); });
        this.db.on('topologyDescriptionChanged', (event): void => {
          if (event.newDescription.type !== 'ReplicaSetWithPrimary') {
            this.executeCallbacks('error', [new Error('MongoDB ReplicaSet Primary node went down')]);
          }
        });

      } catch(err) {
        this.executeCallbacks('error', [err]);
      }
    }

    this.executeCallback(this.callbacks['open'], [this.db]);
  }

  isConnected(): boolean {
    try {
      return this.client.isConnected();
    } catch (e) {
      return false
    }
  }

  on(event: string, callback: any): this {
    const allowedEvents = ['error', 'disconnected'];

    if (allowedEvents.indexOf(event) !== -1) {
      if (!Array.isArray(this.callbacks[event])) {
        this.callbacks[event] = [];
      }

      this.callbacks[event].push(callback);
    }

    return this;
  }

  once(event: string, callback: any): this {
    const allowedEvents = ['open'];

    if (allowedEvents.indexOf(event) !== -1) {
      this.callbacks[event] = callback;
    }

    return this;
  }

  getConnection(): Db {
    return this.db;
  }

  private executeCallbacks(event: string, params: Array<any> = []): void {
    if (Array.isArray(this.callbacks[event])) {
      this.callbacks[event].map((callback: any): void => {
        this.executeCallback(callback, params);
      })
    }
  };

  private executeCallback(callback: any, params: Array<any> = []): void {
    if (callback !== undefined) {
      callback.apply(undefined, params);
    }
  }
}

const connection = new MongoDBConnection();

export default connection;
