'use strict';

var User = require('../../models/user');
var Joi = require('joi');

module.exports = {
  handler: function(request, reply){
    User.findById(request.payload._id, function(err, user){
      user.phone = request.payload.phone
      user.save(function(err){
        reply({user:user});
      })
    })
  }
};
