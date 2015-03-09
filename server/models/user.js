'use strict';

let bcrypt = require('bcrypt');
let mongoose = require('mongoose');
let Request = require('request');
let qs = require('querystring');
let User;

let userSchema = mongoose.Schema({
    displayName: String,
    photoUrl: String,
    github: String,
    createdAt: {type: Date, default: Date.now, required: true}
});


userSchema.statics.github = function(payload, cb){
  let accessTokenUrl = 'https://github.com/login/oauth/access_token';
  let userApiUrl = 'https://api.github.com/user';
  let params = {
    code: payload.code,
    client_id: payload.clientId,
    redirectUri: payload.redirectUri,
    client_secret: process.env.GITHUB_SECRET
  };

  Request.get({url: accessTokenUrl, qs: params}, (err, response, accessToken)=>{
    let headers = {'User-Agent':'Satellizer'};
    accessToken = qs.parse(accessToken);

    Request.get({url:userApiUrl, qs:accessToken, headers:headers, json:true}, cb);
  })
};


userSchema.statics.register = function(o, cb){
  User.findOne({email:o.email}, function(err, user){
    if(user){return cb(true);}

    user = new User(o);
    user.password = bcrypt.hashSync(o.password, 8);
    user.save(cb);
  });
};

userSchema.statics.authenticate = function(o, cb){
  User.findOne({email:o.email}, function(err, user){
    if (!user) {return cb(true);}

    var isGood = bcrypt.compareSync(o.password, user.password);
    if (!isGood) {return cb(true);}

    cb(null, user);
  });
};

User = mongoose.model('User', userSchema);
module.exports = User;
