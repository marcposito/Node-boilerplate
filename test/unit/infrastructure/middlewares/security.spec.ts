import * as proxyquire from 'proxyquire';
import { stub } from 'sinon';
import { expect } from 'chai';

const securityMiddleware = proxyquire.load('../../../../src/infrastructure/middlewares/security', {
  '../config': {
    secret: 'thisIsSuperSecret'
  }
}).default;

describe('src/infrastructure/middlewares/security', async function () {

  const headerStub = stub();
  const statusStub = stub();
  const sendStub = stub();
  const nextStub = stub();

  const req = {
    header: headerStub
  };

  const res = {
    status: statusStub.returnsThis(),
    send: sendStub
  };

  beforeEach(function () {
    statusStub.resetHistory();
    sendStub.resetHistory();
    nextStub.resetHistory();
  });

  it('should call next function', async function () {
    headerStub.returns('thisIsSuperSecret');

    securityMiddleware(req, res, nextStub);

    expect(sendStub.calledOnce).to.be.true;
  });

  it('should return 403 status code if no token provided', async function () {
    securityMiddleware(req, res, nextStub);

    expect(statusStub.calledWith(403)).to.be.true;
    expect(sendStub.calledWith({
      error: 'Invalid secret'
    })).to.be.true;
  });
});
