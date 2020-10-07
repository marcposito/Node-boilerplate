import * as uuid from 'uuid/v4';
import IExampleRepository from "../../../domain/repository/IExampleRepository";
import Example from "../../../domain/model/Example";
import ExampleCreateInputDTO from "../../dto/ExampleCreateInputDTO";
import ExampleCreateInputDTOValidator from "../../validator/ExampleCreateInputDTOValidator";
import ValidationException from "../../../domain/exception/ValidationException";
import ExampleFullView from "../../view/ExampleFullView";

class CreateExample {

  private exampleRepository: IExampleRepository;

  constructor(exampleRepository: IExampleRepository) {
    this.exampleRepository = exampleRepository;
  }

  async execute(data: ExampleCreateInputDTO): Promise<ExampleFullView> {
    await this.validate(data);

    let example = Example.fromJSON({
      ...data,
      _id: uuid()
    });

    example = await this.exampleRepository.insert(example);

    return new ExampleFullView(example);
  }

  async validate(data: ExampleCreateInputDTO): Promise<void> {
    const exampleValidator = new ExampleCreateInputDTOValidator();

    if (!await exampleValidator.validate(data)) {
      const errors = exampleValidator.getErrors();

      throw new ValidationException(errors);
    }
  }

}

export default CreateExample;
