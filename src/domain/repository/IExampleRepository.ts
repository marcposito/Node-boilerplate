import Example from "../model/Example";
import IQueryParam from "./IQueryParam";

interface IExampleRepository {
  findBy(queries: Array<IQueryParam>): Promise<Array<Example>>;
  findById(id: string): Promise<Example>;
  insert(example: Example): Promise<Example>;
  update(id: string, example: Example): Promise<Example>;
  delete(id: string): Promise<boolean>;
}

export default IExampleRepository;
