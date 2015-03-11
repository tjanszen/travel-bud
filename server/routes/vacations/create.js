'use strict';

let Vacation = require('../../models/vacation');
// var Joi = require('joi');

module.exports = {
  // validate: {
  //   payload: {
  //     title: Joi.string(),
  //     departureDate: Joi.date(),
  //     arrivalDate: Joi.date(),
  //     departureAirport: Joi.string(),
  //     arrivalAirport: Joi.string()
  //   }
  // },
  handler: function(request, reply) {
    request.payload.userId = request.auth.credentials._id;
    let vacation = new Vacation(request.payload);
    vacation.save(function(err){
      if(err){return reply().code(400);}

      reply({vacation:vacation}).code(200);
    });
  }
};
