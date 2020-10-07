import * as cluster from 'cluster';
import { cpus } from 'os';
import logger from './logger';
import { connect } from './infrastructure/db'
import { start } from './infrastructure/server';

if (cluster.isMaster) {
  cluster.on('fork', (worker): void => {
    logger.log('debug', `Worker ${worker.id} online`);
  });
  cluster.on('exit', (worker): void => {
    logger.log('warn', `Worker ${worker.id} exited`);
    cluster.fork();
  });

  cpus().forEach((): void => {
    cluster.fork();
  });
} else {
  connect(start);
}
