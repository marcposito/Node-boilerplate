import { expect } from 'chai';
import { stub } from 'sinon';
import * as proxyquire from 'proxyquire';
import MongoDBRepositoryTS from "../../../../src/infrastructure/persistence/MongoDBRepository";

const mongoDBConnection = stub();
const mongoDBCollection = stub();
const mongoDBFindStub = stub();
const mongoDBInsertOneStub = stub();
const mongoDBFindOneAndUpdateStub = stub();
const mongoDBDeleteOneStub = stub();

const MongoDBRepository = proxyquire.load('../../../../src/infrastructure/persistence/MongoDBRepository', {
  '../db/MongoDBConnection': {
    default: {
      getConnection: mongoDBConnection.returns({
        collection: mongoDBCollection.returns({
          find: stub().returns({
            toArray: mongoDBFindStub
          }),
          insertOne: mongoDBInsertOneStub,
          findOneAndUpdate: mongoDBFindOneAndUpdateStub,
          deleteOne: mongoDBDeleteOneStub
        })
      })
    }
  }
}).default;

describe('src/infrastructure/persistence/MongoDBRepository', async function () {

  const collectionName = 'collection';
  const id = '2febbc59-bb1c-4736-b5b5-657a37867188';
  const data = {
    _id: id,
    title: 'title',
    description: 'description',
  };
  const updatedData = {
    _id: id,
    title: 'title-upd',
    description: 'description-upd',
  };

  const mongoDBRepository: MongoDBRepositoryTS = new MongoDBRepository(collectionName);

  beforeEach(function () {
    mongoDBConnection.resetHistory();
    mongoDBCollection.resetHistory();
    mongoDBFindStub.reset();
    mongoDBInsertOneStub.reset();
    mongoDBFindOneAndUpdateStub.reset();
    mongoDBDeleteOneStub.reset();
  });

  it('should find documents', async function () {
    mongoDBFindStub.returns([data]);

    const documents = await mongoDBRepository.find([{
      key: '_id',
      value: data._id
    }]);

    expect(mongoDBFindStub.called).to.be.true;
    expect(Array.isArray(documents)).to.be.true;
    expect(documents[0]).to.be.deep.equal(data);
  });

  it('should insert a document', async function () {
    mongoDBInsertOneStub.returns({
      ops: [ data ]
    });

    const document = await mongoDBRepository.insert(data);

    expect(mongoDBInsertOneStub.called).to.be.true;
    expect(document).to.be.deep.equal([ data ]);
  });

  it('should update a document by ID', async function () {
    mongoDBFindStub.returns([data]);
    mongoDBFindOneAndUpdateStub.returns({
      value: updatedData
    });

    const document = await mongoDBRepository.update(data._id, updatedData);

    expect(mongoDBFindOneAndUpdateStub.called).to.be.true;
    expect(document).to.be.deep.equal(updatedData);
  });

  it('should delete document by ID', async function () {
    mongoDBFindStub.returns([data]);
    mongoDBDeleteOneStub.returns({
      result: {
        ok: 1
      }
    });

    const isDeleted = await mongoDBRepository.delete(data._id);

    expect(mongoDBDeleteOneStub.called).to.be.true;
    expect(isDeleted).to.be.true;
  });

  it('should return the mongo connection', async function () {
    mongoDBRepository.connection;

    expect(mongoDBConnection.called).to.be.true;
  });

  it('should return the mongo collection', async function () {
    mongoDBRepository.collection;

    expect(mongoDBConnection.called).to.be.true;
    expect(mongoDBCollection.called).to.be.true;
  });



});
