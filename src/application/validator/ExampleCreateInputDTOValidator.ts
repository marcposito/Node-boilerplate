import * as Joi from "@hapi/joi";
import { ObjectSchema } from "@hapi/joi";
import Validator from "./Validator";

class ExampleCreateInputDTOValidator extends Validator {

  getRules(): ObjectSchema {
    return Joi.object().keys({
      field1: Joi.string().required(),
      field2: Joi.number().required(),
      field3: Joi.string().min(3).required(),
      inmutableField: Joi.string().required(),
      optField: Joi.string().optional()
    })
  }

}

export default ExampleCreateInputDTOValidator;
