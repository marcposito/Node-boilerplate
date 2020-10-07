import * as chai from 'chai';
import * as sinon from 'sinon';
import { SinonFakeTimers } from "sinon";
import * as proxyquire from 'proxyquire';
import mocks from "../../../../mocks";
import UpdateExampleUseCaseTS from "../../../../../src/application/use-cases/example/UpdateExample";
import Example from "../../../../../src/domain/model/Example";
import IExampleRepository from "../../../../../src/domain/repository/IExampleRepository";
import ValidationException from "../../../../../src/domain/exception/ValidationException";
import ResourceNotFound from "../../../../../src/domain/exception/ResourceNotFound";
import ExampleFullView from "../../../../../src/application/view/ExampleFullView";

const { expect } = chai;
const { stub } = sinon;

const uuidStub = stub();

const validateExampleUpdateInputDTOValidator = stub();
const getErrorsExampleUpdateInputDTOValidator = stub();
const exampleUpdateInputDTOValidatorStub = {
  default: stub().returns({
    validate: validateExampleUpdateInputDTOValidator,
    getErrors: getErrorsExampleUpdateInputDTOValidator,
  })
};

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

const UpdateExampleUseCase = proxyquire('../../../../../src/application/use-cases/example/UpdateExample', {
  "../../validator/ExampleUpdateInputDTOValidator": exampleUpdateInputDTOValidatorStub
}).default;

const updateExampleUseCase: UpdateExampleUseCaseTS = new UpdateExampleUseCase(exampleRepositoryStub);

const id = '2febbc59-bb1c-4736-b5b5-657a37867188';
const exampleUpdatedInputData = mocks.example.getUpdatedInputData();
const exampleData = {
  ...mocks.example.getData(),
  id
};

describe('src/application/use-cases/example/UpdateExample', async function () {

  let clock: SinonFakeTimers;

  beforeEach(function () {
    uuidStub.returns(id);
    validateExampleUpdateInputDTOValidator.resolves(true);
    getErrorsExampleUpdateInputDTOValidator.resolves([]);
    findExampleByStub.resolves([ Example.fromJSON({ _id: id, ...exampleData }) ]);
    findExampleById.resolves(Example.fromJSON({ _id: id, ...exampleData }));
    insertExampleStub.resolvesArg(0);
    updateExampleStub.resolvesArg(1);

    clock = sinon.useFakeTimers();
  });

  afterEach(function () {
    uuidStub.reset();
    validateExampleUpdateInputDTOValidator.reset();
    getErrorsExampleUpdateInputDTOValidator.reset();
    findExampleByStub.reset();
    findExampleById.reset();
    insertExampleStub.reset();
    updateExampleStub.reset();

    clock.restore();
  });

  it('should update a example without optional parameters', async function () {
    const example = await updateExampleUseCase.execute(id, exampleUpdatedInputData);

    expect(validateExampleUpdateInputDTOValidator.called).to.be.true;
    expect(findExampleById.calledOnceWith(id)).to.be.true;
    expect(updateExampleStub.calledOnce).to.be.true;
    expect(example).to.be.instanceof(ExampleFullView);
    expect(example.entities[0]).to.be.deep.equals(Example.fromJSON({ _id: id, ...exampleUpdatedInputData, inmutableField: exampleData.inmutableField, optField: 'optField' }));
  });

  it('should update a example with optional parameters', async function () {
    const exampleUpdatedInputDataWithOptParams = {
      ...mocks.example.getUpdatedInputDataWithOptionals(),
      id
    };

    const example = await updateExampleUseCase.execute(id, exampleUpdatedInputDataWithOptParams);

    expect(validateExampleUpdateInputDTOValidator.called).to.be.true;
    expect(findExampleById.calledOnceWith(id)).to.be.true;
    expect(updateExampleStub.calledOnce).to.be.true;
    expect(example).to.be.instanceof(ExampleFullView);
    expect(example.entities[0]).to.be.deep.equals(Example.fromJSON({ _id: id, ...exampleUpdatedInputDataWithOptParams, inmutableField: exampleData.inmutableField }));
  });

  it('should throw an error if there are any data validation problem', async function () {
    validateExampleUpdateInputDTOValidator.resolves(false);
    getErrorsExampleUpdateInputDTOValidator.resolves([ { field: 'name', message: 'name is required' } ]);

    try {
      await updateExampleUseCase.execute(id, exampleData);
    } catch (err) {
      expect(err).to.be.instanceof(ValidationException);
    } finally {
      expect(validateExampleUpdateInputDTOValidator.calledOnce).to.be.true;
    }
  });

  it('should throw an error if example to update not found', async function () {
    findExampleById.throws(new ResourceNotFound(id));

    try {
      await updateExampleUseCase.execute(id, exampleData);
    } catch (err) {
      expect(err).to.be.instanceof(ResourceNotFound);
    } finally {
      expect(findExampleById.calledOnce).to.be.true;
    }
  });

});
