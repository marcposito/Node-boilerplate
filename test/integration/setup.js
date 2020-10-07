/* eslint-env mocha */
'use strict';

const nock = require('nock');
const fixturesPath = './test/fixtures';
const nockBackMocha = require('nock-back-mocha')(fixturesPath);
const nockBack = nock.back;


module.exports = {
  before: function () {
    if (nockBack.currentMode === 'record') {
      nock.enableNetConnect('127.0.0.1');
      console.log('mode = record');
    }
  },
  after: function () {

  },
  beforeEach: function () {
    return nockBackMocha.beforeEach;
  },
  afterEach: function () {
    return nockBackMocha.afterEach;
  }
};
