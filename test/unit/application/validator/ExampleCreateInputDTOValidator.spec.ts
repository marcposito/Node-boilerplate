import { expect } from 'chai';
import mocks from "../../../mocks";
import ExampleCreateInputDTOValidator from "../../../../src/application/validator/ExampleCreateInputDTOValidator";

const inputData = mocks.example.getInputData();

describe('src/application/validator/ExampleCreateInputDTOValidator.ts', async function () {

  it('should create a ExampleCreateInputDTOValidator', async function () {
    expect(() => {
      new ExampleCreateInputDTOValidator();
    }).to.not.throw();
  });

  it('should validate input DTO', async function () {
    const validator = new ExampleCreateInputDTOValidator();

    expect(await validator.validate(inputData)).to.be.true;
    expect(validator.getErrors()).to.be.deep.equals([]);
  });

  it('should return errors if validate fails', async function () {
    const validator = new ExampleCreateInputDTOValidator();

    expect(await validator.validate({ ...inputData, field1: undefined })).to.be.false;
    expect(validator.getErrors()).to.be.deep.equals([ { field: 'field1', message: '"field1" is required' } ]);
  });

});
