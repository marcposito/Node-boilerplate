import { expect } from 'chai';
import * as sinon from 'sinon';
import { SinonFakeTimers } from "sinon";
import * as proxyquire from 'proxyquire';
import mocks from "../../../../mocks";
import GetExampleUseCaseTS from "../../../../../src/application/use-cases/example/GetExample";
import Example from "../../../../../src/domain/model/Example";
import IExampleRepository from "../../../../../src/domain/repository/IExampleRepository";
import ResourceNotFound from "../../../../../src/domain/exception/ResourceNotFound";
import ExampleFullView from "../../../../../src/application/view/ExampleFullView";

const { stub } = sinon;

const uuidStub = stub();

const findExampleByStub = stub();
const findExampleById = stub();
const insertExampleStub = stub();
const updateExampleStub = stub();
const exampleRepositoryStub = <IExampleRepository>{
  findBy: (queries: any) => { return findExampleByStub(queries); },
  findById: (id: string) => { return findExampleById(id); },
  insert: (example: Example) => { return insertExampleStub(example); },
  update: (id: string, example: Example) => { return updateExampleStub(id, example) },
};

const GetExampleUseCase = proxyquire('../../../../../src/application/use-cases/example/GetExample', {

}).default;

const getExampleUseCase: GetExampleUseCaseTS = new GetExampleUseCase(exampleRepositoryStub);

const id = '2febbc59-bb1c-4736-b5b5-657a37867188';
const exampleData = {
  ...mocks.example.getData(),
  id
};

describe('src/application/use-cases/example/GetExample', async function () {

  let clock: SinonFakeTimers;

  beforeEach(function () {
    uuidStub.returns(id);
    findExampleByStub.resolves([ Example.fromJSON({ _id: id, ...exampleData }) ]);
    findExampleById.resolves(Example.fromJSON({ _id: id, ...exampleData }));
    insertExampleStub.resolvesArg(0);
    updateExampleStub.resolvesArg(1);

    clock = sinon.useFakeTimers();
  });

  afterEach(function () {
    uuidStub.reset();
    findExampleByStub.reset();
    findExampleById.reset();
    insertExampleStub.reset();
    updateExampleStub.reset();

    clock.restore();
  });

  it('should get example', async function () {
    const example = await getExampleUseCase.execute(id);

    expect(findExampleById.calledOnceWith(id)).to.be.true;
    expect(example).to.be.instanceof(ExampleFullView);
    expect(example.entities[0]).to.be.deep.equals(Example.fromJSON({ _id: id, ...exampleData }));
  });

  it('should throw an error if example to update not found', async function () {
    findExampleById.throws(new ResourceNotFound(id));

    try {
      await getExampleUseCase.execute(id);
    } catch (err) {
      expect(err).to.be.instanceof(ResourceNotFound);
    } finally {
      expect(findExampleById.calledOnce).to.be.true;
    }
  });

});
