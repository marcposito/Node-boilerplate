import { expect } from 'chai';
import { stub } from 'sinon';
import * as proxyquire from 'proxyquire';
import mocks from "../../../../mocks";
import DeleteExampleUseCaseTS from "../../../../../src/application/use-cases/example/DeleteExample";
import Example from "../../../../../src/domain/model/Example";
import IExampleRepository from "../../../../../src/domain/repository/IExampleRepository";
import ResourceNotFound from "../../../../../src/domain/exception/ResourceNotFound";

const uuidStub = stub();

const findExampleByStub = stub();
const findExampleById = stub();
const insertExampleStub = stub();
const updateExampleStub = stub();
const deleteExampleStub = stub();
const exampleRepositoryStub = <IExampleRepository>{
  findBy: (queries: any) => { return findExampleByStub(queries); },
  findById: (id: string) => { return findExampleById(id); },
  insert: (example: Example) => { return insertExampleStub(example); },
  update: (id: string, example: Example) => { return updateExampleStub(id, example) },
  delete: (id: string) => { return deleteExampleStub(id); }
};

const DeleteExampleUseCase = proxyquire('../../../../../src/application/use-cases/example/DeleteExample', {

}).default;

const deleteExampleUseCase: DeleteExampleUseCaseTS = new DeleteExampleUseCase(exampleRepositoryStub);

const id = '2febbc59-bb1c-4736-b5b5-657a37867188';
const exampleData = {
  ...mocks.example.getData(),
  id
};

describe('src/application/use-cases/example/DeleteExample', async function () {

  beforeEach(function () {
    uuidStub.returns(id);
    findExampleByStub.resolves([ Example.fromJSON({ _id: id, ...exampleData }) ]);
    findExampleById.resolves(Example.fromJSON({ _id: id, ...exampleData }));
    insertExampleStub.resolvesArg(0);
    updateExampleStub.resolvesArg(1);
    deleteExampleStub.resolves(true);
  });

  afterEach(function () {
    uuidStub.reset();
    findExampleByStub.reset();
    findExampleById.reset();
    insertExampleStub.reset();
    updateExampleStub.reset();
    deleteExampleStub.reset();
  });

  it('should delete the example', async function () {
    await deleteExampleUseCase.execute(id);

    expect(findExampleById.calledOnceWith(id)).to.be.true;
    expect(deleteExampleStub.calledOnceWith(id)).to.be.true;
  });

  it('should throw an error if example to update not found', async function () {
    findExampleById.throws(new ResourceNotFound(id));

    try {
      await deleteExampleUseCase.execute(id);
    } catch (err) {
      expect(err).to.be.instanceof(ResourceNotFound);
    } finally {
      expect(findExampleById.calledOnce).to.be.true;
    }
  });

});
