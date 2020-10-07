import IExampleRepository from '../../domain/repository/IExampleRepository';
import Example from "../../domain/model/Example";
import MongoDBRepository from "./MongoDBRepository";
import ResourceNotFound from "../../domain/exception/ResourceNotFound";
import IQueryParam from "../../domain/repository/IQueryParam";

class MongoDBExampleRepository implements IExampleRepository {

  private readonly _mongoDBRepository : MongoDBRepository;
  public collectionName: string = 'example';

  constructor() {
    this._mongoDBRepository = new MongoDBRepository(this.collectionName);
  }

  async findBy(queries: Array<IQueryParam>): Promise<Array<Example>> {
    const data = await this._mongoDBRepository.find(queries);

    return data.map((item: any): Example => {
      return Example.fromJSON(item);
    });
  }

  async findById(id: string): Promise<Example> {
    const data = await this._mongoDBRepository.find([{ key: '_id', value: id }]);

    if (data.length === 0) {
      throw new ResourceNotFound(id);
    }

    return Example.fromJSON(data[0]);
  }

  async insert(example: Example): Promise<Example> {
    const data = await this._mongoDBRepository.insert({
      _id: example.id,
      field1: example.field1,
      field2: example.field2,
      field3: example.field3,
      inmutableField: example.inmutableField,
      optField: example.optField,
    });

    return Example.fromJSON(data[0]);
  }

  async update(id: string, example: Example): Promise<Example> {
    let data = await this._mongoDBRepository.find([{ key: '_id', value: id }]);

    if (data.length === 0) {
      throw new ResourceNotFound(id);
    }

    data = await this._mongoDBRepository.update(id, {
      field1: example.field1,
      field2: example.field2,
      field3: example.field3,
      optField: example.optField,
    });

    return Example.fromJSON(data);
  }

  async delete(id: string): Promise<boolean> {
    return await this._mongoDBRepository.delete(id);
  }

}

export default new MongoDBExampleRepository();
