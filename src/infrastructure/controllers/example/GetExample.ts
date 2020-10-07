import { Request, Response } from "express";
import GetExampleUseCase from "../../../application/use-cases/example/GetExample";
import HttpThrowableException from "../../../domain/exception/HttpThrowableException";
import logger from "../../../logger";
import exampleRepo from "../../persistence/MongoDBExampleRepository";

export default async (req: Request, res: Response): Promise<any> => {
  try {
    logger.log('debug', '[HANDLER] GetExample');

    const useCase = new GetExampleUseCase(exampleRepo);
    const { id } = req.params;
    const view = await useCase.execute(id);

    return res.send(await view.generate());
  } catch (err) {
    if (err instanceof HttpThrowableException) {
      return res.status(err.httpCode).send(err.response());
    }

    logger.log('error', `GetExample error: ${err.stack}`);
    return res.status(500).send('Internal Server Error');
  }
}
