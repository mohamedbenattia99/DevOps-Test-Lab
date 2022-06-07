const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../server');
const should = chai.should();
const expect = chai.expect;

describe('GET /employee-list', () => {
    it('should return a list of employees when called', done => {
      chai
        .request(app)
        .get('/api/')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });