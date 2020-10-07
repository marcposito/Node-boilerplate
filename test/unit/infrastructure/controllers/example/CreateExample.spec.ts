import * as proxyquire from 'proxyquire';
import { stub } from 'sinon';
import { expect } from 'chai';
import Example from "../../../../../src/domain/model/Example";
import ValidationException from "../../../../../src/domain/exception/ValidationException";
import mocks from "../../../../mocks";
import ExampleFullView from "../../../../../src/application/view/ExampleFullView";

const createExampleUseCaseStub = stub();

const createExample = proxyquire.load('../../../../../src/infrastructure/controllers/example/CreateExample', {
  '../../../application/use-cases/example/CreateExample': {
    default: stub().returns({
      execute: createExampleUseCaseStub
    })
  },
  '../../../logger': {
    default: {
      log: stub()
    }
  },
}).default;

const statusStub = stub();
const sendStub = stub();

const res = {
  status: statusStub.returnsThis(),
  send: sendStub
};

const req = {
  body: mocks.example.getInputData()
};

const id = '2febbc59-bb1c-4736-b5b5-657a37867188';
const exampleData = mocks.example.getData();

describe('src/infrastructure/controllers/example/CreateExample', async function () {

  beforeEach(function () {
    statusStub.resetHistory();
    sendStub.resetHistory();
    createExampleUseCaseStub.reset();

    createExampleUseCaseStub.resolves(new ExampleFullView(Example.fromJSON({ _id: id, ...exampleData })));
  });

  it('should return an example', async function () {
    await createExample(req, res);

    expect(statusStub.called).to.be.false;
    expect(sendStub.calledOnce).to.be.true;
    expect(sendStub.getCall(0).args[0]).to.be.deep.equals({ id: id, ...exampleData });
  });

  it('should return 400 status code example is not valid', async function () {
    const exception = new ValidationException([{
      field: 'field',
      message: 'message'
    }]);

    createExampleUseCaseStub.throws(exception);

    await createExample(req, res);

    expect(statusStub.calledWith(400)).to.be.true;
    expect(sendStub.calledOnceWith({
      message: exception.message,
      errors: exception.errors
    })).to.be.true;
  });

  it('should return 500 status code if unrecognized error occurs', async function () {
    const message = 'An error has occurred';
    createExampleUseCaseStub.throws(new Error(message));

    await createExample(req, res);

    expect(statusStub.calledWith(500)).to.be.true;
    expect(sendStub.calledOnceWith('Internal Server Error')).to.be.true;
  });
});
