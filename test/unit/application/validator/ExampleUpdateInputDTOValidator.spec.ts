import { expect } from 'chai';
import mocks from "../../../mocks";
import ExampleUpdateInputDTOValidator from "../../../../src/application/validator/ExampleUpdateInputDTOValidator";

const updateInputData = mocks.example.getUpdatedInputData();

describe('src/application/validator/ExampleUpdateInputDTOValidator.ts', async function () {

  it('should create a ExampleUpdateInputDTOValidator', async function () {
    expect(() => {
      new ExampleUpdateInputDTOValidator();
    }).to.not.throw();
  });

  it('should validate input DTO', async function () {
    const validator = new ExampleUpdateInputDTOValidator();

    expect(await validator.validate(updateInputData)).to.be.true;
    expect(validator.getErrors()).to.be.deep.equals([]);
  });

  it('should return errors if validate fails', async function () {
    const validator = new ExampleUpdateInputDTOValidator();

    expect(await validator.validate({ ...updateInputData, field1: undefined })).to.be.false;
    expect(validator.getErrors()).to.be.deep.equals([ { field: 'field1', message: '"field1" is required' } ]);
  });

});
