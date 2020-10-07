import { Request, Response } from "express";
import UpdateExampleUseCase from "../../../application/use-cases/example/UpdateExample";
import HttpThrowableException from "../../../domain/exception/HttpThrowableException";
import logger from "../../../logger";
import exampleRepo from "../../persistence/MongoDBExampleRepository";

export default async (req: Request, res: Response): Promise<any> => {
  try {
    logger.log('debug', '[HANDLER] UpdateExample');

    const useCase = new UpdateExampleUseCase(exampleRepo);
    const { id } = req.params;
    const view = await useCase.execute(id, req.body);

    return res.send(await view.generate());
  } catch (err) {
    if (err instanceof HttpThrowableException) {
      return res.status(err.httpCode).send(err.response());
    }

    logger.log('error', `UpdateExample error: ${err.stack}`);
    return res.status(500).send('Internal Server Error');
  }
}
