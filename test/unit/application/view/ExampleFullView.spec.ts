import { expect } from 'chai';
import mocks from "../../../mocks";
import ExampleFullView from "../../../../src/application/view/ExampleFullView";
import Example from "../../../../src/domain/model/Example";

const id = '2febbc59-bb1c-4736-b5b5-657a37867188';
const exampleData = {
  ...mocks.example.getData(),
  id: id
};

describe('src/application/view/ExampleFullView.ts', async function () {

  it('should create a ExampleFullView', async function () {
    expect(() => {
      new ExampleFullView(Example.fromJSON({ _id: id, ...exampleData }));
    }).to.not.throw();
  });

  it('should generate view DTO', async function () {
    const view = new ExampleFullView(Example.fromJSON({ _id: id, ...exampleData }));

    expect(await view.generate()).to.be.deep.equals(exampleData);
  });

  it('should return entities', async function () {
    const example = Example.fromJSON({ _id: id, ...exampleData });
    const view = new ExampleFullView(example);

    expect(view.entities).to.be.deep.equals([example]);
  });

});
