/* eslint-env mocha */
'use strict';

import config from "../../src/infrastructure/config";

const request = require('supertest');
const { expect } = require('chai');

const { secret } = require('../../dist/infrastructure/config').default;
const { connect } = require('../../dist/infrastructure/db');
const { app } = require('../../dist/infrastructure/server');
const setup = require('./setup');

before(setup.before);
beforeEach(setup.beforeEach);
afterEach(setup.afterEach);

async function waitDBConnections() {
  await connect();
}

waitDBConnections();

describe('/', function () {
  it(`should respond '${config.app_name} is running'`, function (done) {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        console.log(err);
        expect(err).to.be.null;
        expect(res.text).to.equal(`${config.app_name} is running`);
        done();
      });
  });
});

describe('/ping', function () {
  it(`should respond 'OK'`, function (done) {
    request(app)
      .get('/ping')
      .set('x-auth-secret', secret)
      .expect(200)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.text).to.equal('pong');
        done();
      });
  });
});
