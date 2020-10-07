import { Request, Response, NextFunction } from 'express';
import config from '../config';

/**
 * Very trivial security check for checking the presence
 * of a secret in http request headers. this MUST be used
 * with TLS connection in order to make it usable.
 * The header name is "x-cj-identity"
 */
const securityMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (req.header(config.auth.header) === config.auth.secret) {
    next();
  } else {
    res.status(403).send({
      error: 'Invalid secret'
    });
  }
};

export default securityMiddleware;
