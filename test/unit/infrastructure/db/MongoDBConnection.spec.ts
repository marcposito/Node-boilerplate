import * as proxyquire from 'proxyquire';
import { stub } from 'sinon';
import { expect } from 'chai';

const mongoDBConnect = stub();
const mongoDBDbStub = stub();
const mongoDBDbOnStub = stub();

const mongoDBConnection = proxyquire.load('../../../../src/infrastructure/db/MongoDBConnection', {
  'mongodb': {
    MongoClient: stub().returns({
      connect: mongoDBConnect.returnsThis(),
      db: mongoDBDbStub.returns({
        on: mongoDBDbOnStub
      }),
    })
  }
}).default;

describe('src/infrastructure/db/MongoDBConnection', async function () {

  it('should call mongodb connect function', async function () {
    await mongoDBConnection.connect('mongodb://mongodb-uri:27017', 'database');

    expect(mongoDBConnect.calledOnce).to.be.true;
  });

  it('should set mongodb database', async function () {
    await mongoDBConnection.connect('mongodb://mongodb-uri:27017', 'database');

    expect(mongoDBDbStub.calledOnceWith('database')).to.be.true;
  });

  it('should execute open callback', async function () {
    const onOpenStub = stub();

    mongoDBConnection.once('open', onOpenStub);
    await mongoDBConnection.connect('mongodb://mongodb-uri:27017', 'database');

    expect(onOpenStub.calledOnceWith(mongoDBConnection.getConnection())).to.be.true;
  });

});
