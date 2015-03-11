'use strict';

let mongoose = require('mongoose');
let request = require('request');
let _ = require('lodash');
let moment = require('moment');
let Trip;

let tripSchema = mongoose.Schema({
  title: {type: String, required: true},
  hashtag: {type: String, required: true},
  originAirport: {type: String, required: true},
  destinationAirport: {type: String, required: true},
  destinationCity: {type: String, required: true},
  departureDate: {type: Date, required: true},
  returnDate: {type: Date, required: true},
})

tripSchema.statics.flights = function(o, cb) {
  var options = {
    method: 'POST',
    url: 'https://api.test.sabre.com/v1/auth/token',
    headers: {
      'Authorization': 'Basic ' + process.env.SABRE_TOKEN,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  };

  request(options, function(err, response, body){
    var token = JSON.parse(body).access_token;
      var options = {
        method: 'GET',
        url: 'https://api.test.sabre.com/v1/shop/flights/fares?origin=' + o.originAirport + '&departuredate=' + o.departureDate + '&returndate=' + o.returnDate + '&theme=' + o.theme,
        headers: {
          'Authorization': 'Bearer ' + token
        }
      };

      request(options, function(err, response, body){
        body = JSON.parse(body);
        var fares = body.FareInfo || [];

        async.map(fares, function(fare, cb){
          request('http://airportcode.riobard.com/airport/'+fare.DestinationLocation+'?fmt=JSON', function(err, response, body){
            body = JSON.parse(body);
            fare.DestinationCity = body ? body.location : '';
            cb(null, fare);
          });
        }, function(err, results){
          cb({results:results});
        });
      });
  });
};

Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;
