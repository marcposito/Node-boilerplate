import { Router, Request, Response } from 'express';
import MongoDBConnection from "../db/MongoDBConnection";

const router = Router();

router.route('').get((_req: Request, res: Response): void => {
  try {
    if (!MongoDBConnection.isConnected()) {
      res.status(500).send({
        error: 'MongoDB not connected'
      });
    }

    res.send('pong');
  } catch (e) {
    res.status(500).send({
      error: 'Internal server error'
    });
  }
});

export default router;
