/* jshint expr:true */

'use strict';
require('babel/register');

var User = require('../../server/models/user');
var expect = require('chai').expect;
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.beforeEach;
require('../../server/index');
var cp = require('child_process');
var dbname = process.env.MONGO_URL.split('/')[3];

describe('User Model', function() {
  beforeEach(function(done) {
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [dbname], {cwd:__dirname + '/../scripts'}, function(){
      done();
    });
  });

  describe('.register', function() {
    it('should register a user', function(done) {
      User.register({email:'fay@aol.com', password:'123'}, function(err, user) {
        expect(err).to.not.be.ok;
        expect(user.email).to.equal('fay@aol.com');
        expect(user.password).to.have.length(60);
        expect(user.createdAt).to.be.instanceof(Date);
        expect(user._id).to.be.ok;
        expect(user).to.be.ok;
        done();
      });
    });

    it('should NOT register a user - duplicate email', function(done) {
      User.register({email:'bob@aol.com', password:'123'}, function(err, user) {
        expect(err).to.be.ok;
        expect(user).to.not.be.ok;
        done();
      });
    });
  });

  describe('.authenticate', function() {
    it('should authenticate a user', function(done) {
      User.authenticate({email:'bob@aol.com', password:'123'}, function(err, user) {
        expect(err).to.not.be.ok;
        expect(user.email).to.equal('bob@aol.com');
        expect(user.password).to.have.length(60);
        expect(user.createdAt).to.be.instanceof(Date);
        expect(user._id).to.be.ok;
        expect(user).to.be.ok;
        done();
      });
    });

    it('should NOT authenticate a user - bad email', function(done) {
      User.authenticate({email:'wrong@aol.com', password:'123'}, function(err, user) {
        expect(err).to.be.ok;
        expect(user).to.not.be.ok;
        done();
      });
    });

    it('should NOT authenticate a user - bad password', function(done) {
      User.authenticate({email:'bob@aol.com', password:'wrong'}, function(err, user) {
        expect(err).to.be.ok;
        expect(user).to.not.be.ok;
        done();
      });
    });

    it('should NOT authenticate a user - bad email and password', function(done) {
      User.authenticate({email:'wrong@aol.com', password:'wrong'}, function(err, user) {
        expect(err).to.be.ok;
        expect(user).to.not.be.ok;
        done();
      });
    });
  });
  describe('.create', function(){
    it('should create a Facebook user', function(done){
      User.create('facebook', {facebook: '00000000000007', displayName: 'Tommy Janszen', photoUrl:'https://pbs.twimg.com/profile_images/560170035935580160/QMqViDYS.jpeg'}, function(err, user){
        expect(err).to.not.be.ok;
        expect(user).to.be.ok;
        done();
      });
    });
    it('should sign in a Facebook user', function(done){
      User.create('facebook', {facebook: '00000000000008', displayName: 'Tommy Janszen', photoUrl:'http://graph.facebook.com/00000000000008/picture?type=large'}, function(err, user){
        expect(err).to.not.be.ok;
        expect(user).to.be.ok;
        done();
      });
    });
  });
  describe('#token', function(){
    User.token()
  })
});
