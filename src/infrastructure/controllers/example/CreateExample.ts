import { Request, Response } from "express";
import CreateExampleUseCase from "../../../application/use-cases/example/CreateExample";
import HttpThrowableException from "../../../domain/exception/HttpThrowableException";
import logger from "../../../logger";
import exampleRepo from "../../persistence/MongoDBExampleRepository";

export default async (req: Request, res: Response): Promise<any> => {
  try {
    logger.log('debug', '[HANDLER] CreateExample');

    const useCase = new CreateExampleUseCase(exampleRepo);
    const view = await useCase.execute(req.body);

    return res.send(await view.generate());
  } catch (err) {
    if (err instanceof HttpThrowableException) {
      return res.status(err.httpCode).send(err.response());
    }

    logger.log('error', `CreateExample error: ${err.stack}`);
    return res.status(500).send('Internal Server Error');
  }
}
