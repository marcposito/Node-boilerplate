
const getInputData = function () {
  return {
    field1: 'field1',
    field2: 2,
    field3: 'field3',
    inmutableField: 'inmutableField',
    optField: undefined
  };
};

const getInputDataWithOptionals = function () {
  return {
    ...getInputData(),
    optField: 'optField'
  };
};

const getUpdatedInputData = function () {
  return {
    field1: 'field1-upd',
    field2: 2+2,
    field3: 'field3-upd',
    optField: undefined
  };
};

const getUpdatedInputDataWithOptionals = function () {
  return {
    ...getUpdatedInputData(),
    optField: 'optField-upd'
  };
};

const getData = function () {
  const inputData = getInputDataWithOptionals();

  return {
    field1: inputData.field1,
    field2: inputData.field2,
    field3: inputData.field3,
    inmutableField: inputData.inmutableField,
    optField: inputData.optField,
    createdAt: new Date('1970-01-01T00:00:00.000Z'),
    updatedAt: new Date('1970-01-01T00:00:00.000Z'),
  };
};

export default {
  getInputData,
  getInputDataWithOptionals,
  getUpdatedInputData,
  getUpdatedInputDataWithOptionals,
  getData
}
