'use strict';

let Trip = require('../../models/trip');
let Vacation = require('../../models/vacation');

module.exports = {
  handler: function(request, reply) {
    Vacation.findById(request.params.vacationId, function(err, vacation){
      Trip.flights(vacation, function(flights){
        reply(flights);
      });
    });
  }
};
