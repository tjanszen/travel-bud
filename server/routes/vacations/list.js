'use strict';

let Vacation = require('../../models/vacation');

module.exports = {
  handler: function(request, reply) {
    Vacation.findById(request.params.userId, function(err, vacations){
      if(err){return reply().code(400);}

      reply({vacations:vacations}).code(200)
    });
  }
};
