'use strict';

let Trip = require('../../models/trip');
let Vacation = require('../../models/vacation');
let Text = require('../../models/text');

module.exports = {
  handler: function(request, reply) {
    Vacation.findById(request.params.vacationId, (err, vaca)=>{
      vaca.purchase(request.payload, (err, charge)=>{
        if(err){return reply().code(400);}

        vaca.makeItinerary(request.payload);

        Text.send(request.auth.credentials.phone, `Congrats on your purchase from ${vaca.flight.itinerary.to[0].departure} to ${vaca.flight.itinerary.from[0].departure} for $${vaca.flight.charge.amount.toFixed(2)}. If this is not your purchase please 911`, (err, msg)=>{
          vaca.save(function(){
            reply(vaca);
          });
        });
      });
    });
  }
};
