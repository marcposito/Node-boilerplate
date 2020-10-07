import { expect } from 'chai';
import mocks from "../../../mocks";
import ExampleShortView from "../../../../src/application/view/ExampleShortView";
import Example from "../../../../src/domain/model/Example";

const id = '2febbc59-bb1c-4736-b5b5-657a37867188';
const exampleData = {
  ...mocks.example.getData(),
  id: id
};

describe('src/application/view/ExampleShortView.ts', async function () {

  it('should create a ExampleShortView', async function () {
    expect(() => {
      new ExampleShortView(Example.fromJSON({ _id: id, ...exampleData }));
    }).to.not.throw();
  });

  it('should generate view DTO', async function () {
    const view = new ExampleShortView(Example.fromJSON({ _id: id, ...exampleData }));

    expect(await view.generate()).to.be.deep.equals({
      id: exampleData.id,
      field1: exampleData.field1,
      field2: exampleData.field2,
      field3: exampleData.field3,
    });
  });

  it('should return entities', async function () {
    const example = Example.fromJSON({ _id: id, ...exampleData });
    const view = new ExampleShortView(example);

    expect(view.entities).to.be.deep.equals([example]);
  });

});
