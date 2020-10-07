import * as cors from 'cors';
import * as express from 'express';
import { Request, Response } from 'express'
import logger from '../logger';
import config from './config';
import * as morgan from 'morgan';
import routes from './routes';
import ping from './routes/ping';
import security from './middlewares/security';

const app = express();

app.use('/docs', express.static('documentation'));

app.use(express.json());
app.use(cors());

app.get('/', (_req: Request, res: Response): void => {
  res.send(`${config.app_name} is running`);
});

app.use(morgan('combined'));

app.use('/ping', ping);

app.use(security);

Object.keys(routes)
  .forEach((routeStart: string): void => {
    app.use(`/${routeStart}`, routes[routeStart]);
  });

const start = (): void => {
  app.listen(config.port, (): void => {
    logger.info(`${config.app_name} running on port ${config.port}`);
  });
};

export {
    start,
    app
}
