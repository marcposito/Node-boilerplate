import { ReadPreference } from "mongodb";
import logger from '../../logger';
import MongoDBConnection from './MongoDBConnection';
import config from "../config";

function onError(err: Error): never {
  logger.log('error', `Failed connecting: ${err}`);

  process.exit();
}

function onDisconnect(err: Error): never {
  logger.log('error', `Lost connection: Err: ${err}`);

  process.exit();
}

function connect(cb: any): Promise<void> {
  MongoDBConnection
    .on('error', onError)
    .on('disconnected', onDisconnect)
    .once('open', cb);

  return MongoDBConnection.connect(config.mongo.uri, config.mongo.database, {
    useUnifiedTopology: true,
    connectTimeoutMS: config.mongo.timeout,
    appname: config.app_name,
    loggerLevel: 'warn',
    autoReconnect: false,
    readPreference: ReadPreference.SECONDARY_PREFERRED,
    bufferMaxEntries: 0
  });
}

export {
  connect
};
