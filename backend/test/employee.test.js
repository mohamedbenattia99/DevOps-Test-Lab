//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Employee = require('../models/Employee');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
const { response } = require("express");
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Employees', () => {
    beforeEach((done) => { //Before each test we empty the database
        Employee.remove({}, (err) => { 
           done();           
        });        
    });});
/*
  * Test the /GET route
  */
  describe('/GET employee', () => {
      it('it should GET all the employees', (done) => {
        this.timeout(5000);
        chai.request(server)
            .get('/api')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });

  //Test the POST Route
  describe("/POST employee",() => {
    it("It should POST a new employee", (done) => {
      this.timeout(5000);

      const employee = {
        name: "Mohamed Test",
        email: "testtest@gmail.com",
        designation : "Finance",
        phoneNumber : "23222836"
      };
      chai.request(server)
          .post("/api/create")
          .send(employee)
          .end((err, response) => {
            console.log(response.body);
            response.should.have.status(201);
            response.body.should.have.property('name').eq("Mohamed Test");
            response.body.should.have.property('email').eq("testtest@gmail.com");
            response.body.should.have.property('designation').eq("Finance");
            response.body.should.have.property('phoneNumber').eq(23222836);

          done();
          });
    })
  });
  //Test Delete Route

