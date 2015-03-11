'use strict';

let Vacation = require('../../models/vacation');

module.exports = {
  handler: function(request, reply) {
    Vacation.find({userId: request.auth.credentials._id}, function(err, vacations){
      if(err){return reply().code(400);}
      reply({vacations:vacations}).code(200);
    });
  }
};
