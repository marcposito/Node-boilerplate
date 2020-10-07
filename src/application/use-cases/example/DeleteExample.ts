import IExampleRepository from '../../../domain/repository/IExampleRepository';

class DeleteExample {

  private exampleRepository: IExampleRepository;

  constructor(exampleRepository: IExampleRepository) {
    this.exampleRepository = exampleRepository;
  }

  async execute(id: string): Promise<void> {
    await this.exampleRepository.findById(id); // To check if exists

    await this.exampleRepository.delete(id);
  }

}

export default DeleteExample;
