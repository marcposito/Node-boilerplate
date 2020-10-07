import { Request, Response } from "express";
import DeleteExampleUseCase from "../../../application/use-cases/example/DeleteExample";
import HttpThrowableException from "../../../domain/exception/HttpThrowableException";
import logger from "../../../logger";
import exampleRepo from "../../persistence/MongoDBExampleRepository";

export default async (req: Request, res: Response): Promise<any> => {
  try {
    logger.log('debug', '[HANDLER] DeleteExample');

    const useCase = new DeleteExampleUseCase(exampleRepo);
    const { id } = req.params;
    await useCase.execute(id);

    return res.status(204).send();
  } catch (err) {
    if (err instanceof HttpThrowableException) {
      return res.status(err.httpCode).send(err.response());
    }

    logger.log('error', `DeleteExample error: ${err.stack}`);
    return res.status(500).send('Internal Server Error');
  }
}
