'use strict';

let Trip = require('../../models/trip');
let Vacation = require('../../models/vacation');

module.exports = {
  handler: function(request, reply) {
    Vacation.findById(request.params.vacationId, (err, vaca)=>{
      vaca.purchase(request.payload, (err, charge)=>{
        if(err){return reply().code(400);}

        vaca.makeItinerary(request.payload);
        vaca.save(function(){
          reply(vaca);
        });
      });
    });
  }
};
