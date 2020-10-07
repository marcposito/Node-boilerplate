import * as chai from 'chai';
import * as sinon from 'sinon';
import { SinonFakeTimers } from "sinon";
import * as proxyquire from 'proxyquire';
import mocks from "../../../../mocks";
import CreateExampleUseCaseTS from "../../../../../src/application/use-cases/example/CreateExample";
import Example from "../../../../../src/domain/model/Example";
import IExampleRepository from "../../../../../src/domain/repository/IExampleRepository";
import ValidationException from "../../../../../src/domain/exception/ValidationException";
import ExampleFullView from "../../../../../src/application/view/ExampleFullView";

const { expect } = chai;
const { stub } = sinon;

const uuidStub = stub();

const validateExampleCreateInputDTOValidator = stub();
const getErrorsExampleCreateInputDTOValidator = stub();
const exampleCreateInputDTOValidatorStub = {
  default: stub().returns({
    validate: validateExampleCreateInputDTOValidator,
    getErrors: getErrorsExampleCreateInputDTOValidator,
  })
};

const findExampleByStub = stub();
const insertExampleStub = stub();
const updateExampleStub = stub();
const exampleRepositoryStub = <IExampleRepository>{
  findBy: (queries: any) => { return findExampleByStub(queries); },
  insert: (example: Example) => { return insertExampleStub(example); },
  update: (id: string, example: Example) => { return updateExampleStub(id, example) },
};

const CreateExampleUseCase = proxyquire('../../../../../src/application/use-cases/example/CreateExample', {
  "uuid/v4": uuidStub,
  "../../validator/ExampleCreateInputDTOValidator": exampleCreateInputDTOValidatorStub
}).default;

const createExampleUseCase: CreateExampleUseCaseTS = new CreateExampleUseCase(exampleRepositoryStub);

const id = '2febbc59-bb1c-4736-b5b5-657a37867188';
const exampleInputData = mocks.example.getInputData();
const exampleData = {
  ...mocks.example.getData(),
  id
};

describe('src/application/use-cases/example/CreateExample', async function () {

  let clock: SinonFakeTimers;

  beforeEach(function () {
    uuidStub.returns(id);
    validateExampleCreateInputDTOValidator.resolves(true);
    getErrorsExampleCreateInputDTOValidator.resolves([]);
    findExampleByStub.resolves([ Example.fromJSON({ _id: id, ...exampleData }) ]);
    insertExampleStub.resolvesArg(0);
    updateExampleStub.resolvesArg(1);

    clock = sinon.useFakeTimers();
  });

  afterEach(function () {
    uuidStub.reset();
    validateExampleCreateInputDTOValidator.reset();
    getErrorsExampleCreateInputDTOValidator.reset();
    findExampleByStub.reset();
    insertExampleStub.reset();
    updateExampleStub.reset();

    clock.restore();
  });

  it('should create a example without optional parameters', async function () {
    const example = await createExampleUseCase.execute(exampleInputData);

    expect(validateExampleCreateInputDTOValidator.called).to.be.true;
    expect(insertExampleStub.called).to.be.true;
    expect(example).to.be.instanceof(ExampleFullView);
    expect(example.entities[0]).to.be.deep.equals(Example.fromJSON({ _id: id, ...exampleData, optField: 'optionalWithValue' }));
  });

  it('should create a example with optional parameters', async function () {
    const exampleInputDataWithOptParams = {
      ...mocks.example.getInputDataWithOptionals(),
      id
    };

    const example = await createExampleUseCase.execute(exampleInputDataWithOptParams);

    expect(validateExampleCreateInputDTOValidator.called).to.be.true;
    expect(insertExampleStub.called).to.be.true;
    expect(example).to.be.instanceof(ExampleFullView);
    expect(example.entities[0]).to.be.deep.equals(Example.fromJSON({ _id: id, ...exampleInputDataWithOptParams }));
  });

  it('should throw an error if there are any data validation problem', async function () {
    validateExampleCreateInputDTOValidator.resolves(false);
    getErrorsExampleCreateInputDTOValidator.resolves([ { field: 'name', message: 'name is required' } ]);

    try {
      await createExampleUseCase.execute(exampleData);
    } catch (err) {
      expect(err).to.be.instanceof(ValidationException);
    }
  });

});
