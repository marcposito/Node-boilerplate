import * as proxyquire from 'proxyquire';
import { stub } from 'sinon';
import { expect } from 'chai';
import Example from "../../../../../src/domain/model/Example";
import ValidationException from "../../../../../src/domain/exception/ValidationException";
import mocks from "../../../../mocks";

const deleteExampleUseCaseStub = stub();

const deleteExample = proxyquire.load('../../../../../src/infrastructure/controllers/example/DeleteExample', {
  '../../../application/use-cases/example/DeleteExample': {
    default: stub().returns({
      execute: deleteExampleUseCaseStub
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

const id = '2febbc59-bb1c-4736-b5b5-657a37867188';
const req = {
  params: {
    id: id
  }
};
const exampleData = mocks.example.getData();

describe('src/infrastructure/controllers/example/DeleteExample', async function () {

  beforeEach(function () {
    statusStub.resetHistory();
    sendStub.resetHistory();
    deleteExampleUseCaseStub.reset();

    deleteExampleUseCaseStub.resolves(Example.fromJSON({ _id: id, ...exampleData }));
  });

  it('should delete an example', async function () {
    await deleteExample(req, res);

    expect(statusStub.calledOnceWith(204)).to.be.true;
    expect(sendStub.calledOnce).to.be.true;
  });

  it('should return 400 status code example is not valid', async function () {
    const exception = new ValidationException([{
      field: 'field',
      message: 'message'
    }]);

    deleteExampleUseCaseStub.throws(exception);

    await deleteExample(req, res);

    expect(statusStub.calledWith(400)).to.be.true;
    expect(sendStub.calledOnceWith({
      message: exception.message,
      errors: exception.errors
    })).to.be.true;
  });

  it('should return 500 status code if unrecognized error occurs', async function () {
    const message = 'An error has occurred';
    deleteExampleUseCaseStub.throws(new Error(message));

    await deleteExample(req, res);

    expect(statusStub.calledWith(500)).to.be.true;
    expect(sendStub.calledOnceWith('Internal Server Error')).to.be.true;
  });
});
