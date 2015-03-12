'use strict';

// let Trip = require('../../models/trip');
// let Vacation = require('../../models/vacation');

module.exports = {
  handler: function(request, reply) {
    console.log(request.payload);
    console.log(request.params.vacationId);
    reply();
  }
};
