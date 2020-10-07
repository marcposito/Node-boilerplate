import exampleControllers from "../../../../../src/infrastructure/controllers/example";
import { expect } from "chai";

describe('src/infrastructure/controllers/example/index', async function () {

  it('should return the current length of example controllers', async function () {
    const numControllers = Object.keys(exampleControllers).length;

    expect(numControllers).to.be.equal(4);
  });

  it('should return the correct controllers', async function () {
    expect(exampleControllers.getExample).to.exist;
    expect(exampleControllers.createExample).to.exist;
    expect(exampleControllers.updateExample).to.exist;
    expect(exampleControllers.deleteExample).to.exist;
  });

});
