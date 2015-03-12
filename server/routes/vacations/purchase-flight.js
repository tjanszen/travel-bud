'use strict';

let Trip = require('../../models/trip');
let Vacation = require('../../models/vacation');

module.exports = {
  handler: function(request, reply) {
    console.log('PARAMS&&&&&&&&&&&&&&&&&', request.params)
    console.log('REQUEST PAYLOAD', request.payload);
    Vacation.findById(request.params.vacationId, (err, vaca)=>{
      vaca.purchase(request.payload, (err, charge)=>{
        vaca.makeItinerary(request.payload, (err, charge)=>{
          console.log(request.paylaod);
          vaca.save(()=>{
            reply();
          });
        });
      });
    });
  }
};
