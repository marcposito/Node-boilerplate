import IExampleRepository from '../../../domain/repository/IExampleRepository';
import ExampleFullView from "../../view/ExampleFullView";

class GetExample {

  private exampleRepository: IExampleRepository;

  constructor(exampleRepository: IExampleRepository) {
    this.exampleRepository = exampleRepository;
  }

  async execute(id: string): Promise<ExampleFullView> {
    const example = await this.exampleRepository.findById(id);

    return new ExampleFullView(example);
  }

}

export default GetExample;
