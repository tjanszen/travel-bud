'use strict';

let Vacation = require('../../models/vacation');

module.exports = {
  handler: function(request, reply) {
    Vacation.findById(request.params.vacationId, function(err, vacation){
      if(err){return reply().code(400);}
      reply({vacation:vacation}).code(200)
    });
  }
};
