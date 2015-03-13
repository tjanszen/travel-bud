/* jshint camelcase:false */
'use strict';

let stripe = require('stripe')(process.env.TEST_SECRET_KEY);
let mongoose = require('mongoose');
let Vacation;

let vacationSchema = mongoose.Schema({
  title: String,
  departureDate: {type: Date, required: true},
  arrivalDate: {type: Date, required: true},
  departureAirport: {type: String, required: true},
  arrivalAirport: {type: String, required: true},
  userId: {type: mongoose.Schema.ObjectId, ref: 'User', required:true},
  createdAt: {type: Date, default: Date.now, required: true},
  flight:{
    charge:{
      id: String,
      amount: Number,
      date: {type: Date}
    },
    itinerary:{
      to:[
        {
          departure: String,
          arrival: String,
          duration: Number,
          flight: Number,
          airline: String
        }
      ],
      from:[
        {
          departure: String,
          arrival: String,
          duration: Number,
          flight: Number,
          airline: String
        }
      ]
    }
  }
});


vacationSchema.methods.purchase = function(o, cb){
  stripe.charges.create({
    amount: Math.ceil(o.cost*100),
    currency: "usd",
    source: o.token, // obtained with Stripe.js
    description: o.description
  }, (err, charge)=>{
    if(!err){
      this.flight.charge.id = charge.id;
      this.flight.charge.amount = charge.amount / 100;
      this.flight.charge.date = new Date();
    }

    cb(err, charge);
  });

};

vacationSchema.methods.makeItinerary = function(o){
  this.flight.itinerary.to = parseItinerary(0, o);
  this.flight.itinerary.from = parseItinerary(1, o);
};

function parseItinerary(index, o){
  return o.itinerary.OriginDestinationOptions.OriginDestinationOption[index].FlightSegment.map(function(s){
    return {
      departure: s.DepartureAirport.LocationCode,
      arrival: s.ArrivalAirport.LocationCode,
      duration: s.ElapsedTime,
      flight: s.OperatingAirline.FlightNumber,
      airline: s.OperatingAirline.Code
    };
  });
}




Vacation = mongoose.model('Vacation', vacationSchema);
module.exports = Vacation;
