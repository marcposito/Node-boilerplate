import { expect } from 'chai';
import { stub } from 'sinon';
import * as proxyquire from 'proxyquire';
import Example from "../../../../src/domain/model/Example";
import ResourceNotFound from "../../../../src/domain/exception/ResourceNotFound";
import mocks from "../../../mocks";

const mongoDBFindStub = stub();
const mongoDBInsertOneStub = stub();
const mongoDBFindOneAndUpdateStub = stub();
const mongoDBDeleteOneStub = stub();

const mongoDBExampleRepository = proxyquire.load('../../../../src/infrastructure/persistence/MongoDBExampleRepository', {
  './MongoDBRepository': {
    default: stub().returns({
      find: mongoDBFindStub,
      insert: mongoDBInsertOneStub,
      update: mongoDBFindOneAndUpdateStub,
      delete: mongoDBDeleteOneStub,
    })
  }
}).default;

const id = '2febbc59-bb1c-4736-b5b5-657a37867188';
const exampleData = {
  ...mocks.example.getData(),
  _id: id
};

describe('src/infrastructure/persistence/MongoDBExampleRepository', async function () {

  beforeEach(function () {
    mongoDBFindStub.reset();
    mongoDBInsertOneStub.reset();
    mongoDBFindOneAndUpdateStub.reset();
    mongoDBDeleteOneStub.reset();
  });

  it('should return the correct mongo collection name', async function () {
    expect(mongoDBExampleRepository.collectionName).to.be.equal('example');
  });

  it('should find examples', async function () {
    mongoDBFindStub.returns([exampleData]);

    const examples = await mongoDBExampleRepository.findBy([{
      key: 'field1',
      value: exampleData.field1
    }]);

    expect(mongoDBFindStub.called).to.be.true;
    expect(Array.isArray(examples)).to.be.true;
    expect(examples[0]).to.be.instanceOf(Example);
    expect(examples[0]).to.be.deep.equal(Example.fromJSON(exampleData));
  });

  it('should find an example by ID', async function () {
    mongoDBFindStub.returns([exampleData]);

    const example = await mongoDBExampleRepository.findById(exampleData._id);

    expect(mongoDBFindStub.called).to.be.true;
    expect(example).to.be.instanceOf(Example);
    expect(example).to.be.deep.equal(Example.fromJSON(exampleData));
  });

  it('should throw an error if don\'t found an example by ID', async function () {
    mongoDBFindStub.returns([]);

    try {
      await mongoDBExampleRepository.findById(exampleData._id)
    } catch(err) {
      expect(mongoDBFindStub.called).to.be.true;
      expect(err).to.be.instanceOf(ResourceNotFound);
    }
  });

  it('should insert a example', async function () {
    mongoDBInsertOneStub.returns([exampleData]);

    const example = await mongoDBExampleRepository.insert(Example.fromJSON(exampleData));

    expect(mongoDBInsertOneStub.called).to.be.true;
    expect(example).to.be.instanceOf(Example);
    expect(example).to.be.deep.equal(Example.fromJSON(exampleData));
  });

  it('should update a example', async function () {
    const updatedExample = exampleData;
    mongoDBFindStub.returns([exampleData]);
    mongoDBFindOneAndUpdateStub.returns(updatedExample);

    const example = await mongoDBExampleRepository.update(exampleData._id, Example.fromJSON(updatedExample));

    expect(mongoDBFindOneAndUpdateStub.called).to.be.true;
    expect(example).to.be.instanceOf(Example);
    expect(example).to.be.deep.equal(Example.fromJSON(updatedExample));
  });

  it('should throw an error when you\'re tying to update non-existent example', async function () {
    mongoDBFindStub.returns([]);

    try {
      await mongoDBExampleRepository.update(exampleData._id, Example.fromJSON(exampleData));
    } catch(err) {
      expect(mongoDBFindStub.called).to.be.true;
      expect(err).to.be.instanceOf(ResourceNotFound);
    }
  });

  it('should delete an example', async function () {
    mongoDBFindStub.returns([exampleData]);
    mongoDBDeleteOneStub.returns(true);

    const isDeleted = await mongoDBExampleRepository.delete(exampleData._id);

    expect(mongoDBDeleteOneStub.called).to.be.true;
    expect(isDeleted).to.be.true;
  });

  it('should throw an error when you\'re tying to delete non-existent example', async function () {
    mongoDBFindStub.returns([]);

    try {
      await mongoDBExampleRepository.delete(exampleData._id);
    } catch(err) {
      expect(mongoDBFindStub.called).to.be.true;
      expect(err).to.be.instanceOf(ResourceNotFound);
    }
  });

});
