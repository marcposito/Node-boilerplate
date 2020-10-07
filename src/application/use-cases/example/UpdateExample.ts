import IExampleRepository from "../../../domain/repository/IExampleRepository";
import Example from "../../../domain/model/Example";
import ExampleUpdateInputDTO from "../../dto/ExampleUpdateInputDTO";
import ExampleUpdateInputDTOValidator from "../../validator/ExampleUpdateInputDTOValidator";
import ValidationException from "../../../domain/exception/ValidationException";
import ExampleFullView from "../../view/ExampleFullView";

class UpdateExample {

  private exampleRepository: IExampleRepository;

  constructor(exampleRepository: IExampleRepository) {
    this.exampleRepository = exampleRepository;
  }

  async execute(id: string, data: ExampleUpdateInputDTO): Promise<ExampleFullView> {
    await this.validate(data);

    let example = await this.updateExample(id, data);

    example = await this.exampleRepository.update(id, example);

    return new ExampleFullView(example);
  }

  async validate(data: ExampleUpdateInputDTO): Promise<void> {
    const exampleValidator = new ExampleUpdateInputDTOValidator();

    if (!await exampleValidator.validate(data)) {
      const errors = exampleValidator.getErrors();

      throw new ValidationException(errors);
    }
  }

  private async updateExample(id: string, exampleUpdatedDTO: ExampleUpdateInputDTO): Promise<Example> {
    const example = await this.exampleRepository.findById(id);

    example.field1 = exampleUpdatedDTO.field1;
    example.field2 = exampleUpdatedDTO.field2;
    example.field3 = exampleUpdatedDTO.field3;

    if (exampleUpdatedDTO.optField) {
      example.optField = exampleUpdatedDTO.optField;
    }

    return example;
  }

}

export default UpdateExample;
