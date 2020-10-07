import { expect } from 'chai';
import mocks from "../../../../mocks";
import Example from "../../../../../src/domain/model/Example";

const id = '2febbc59-bb1c-4736-b5b5-657a37867188';
const exampleData = mocks.example.getData();

describe('src/domain/model/example/Example', async function () {

  it('should create a example', async function () {
    expect(() => {
      Example.fromJSON(exampleData);
    }).to.not.throw();
  });

  it('should create without opt values', async function () {
    const example = Example.fromJSON({ ...exampleData, _id: id, optField: undefined });

    expect(example.optField).to.be.equals('optionalWithValue');
  });

  it('should return toJSON() response', async function () {
    const example = Example.fromJSON({ ...exampleData, _id: id });

    expect(example.toJSON()).to.be.deep.equals({ ...exampleData, id });
  });

  it('should get() methods return the expected value', async function () {
    const example = Example.fromJSON({ ...exampleData, _id: id });

    expect(example.id).to.be.equals(id);
    expect(example.field1).to.be.equals(exampleData.field1);
    expect(example.field2).to.be.equals(exampleData.field2);
    expect(example.field3).to.be.equals(exampleData.field3);
    expect(example.optField).to.be.equals(exampleData.optField);
    expect(example.createdAt).to.be.equals(exampleData.createdAt);
    expect(example.updatedAt).to.be.equals(exampleData.updatedAt);
  });

});
