/* jshint camelcase:false */
'use strict';

let bcrypt = require('bcrypt');
let mongoose = require('mongoose');
let Request = require('request');
let qs = require('querystring');
let jwt = require('jwt-simple');
let moment = require('moment');
let Vacation;
// let user = require('../models/user');

let vacationSchema = mongoose.Schema({
    title: String,
    departureDate: {type: Date, required: true},
    arrivalDate: {type: Date, required: true},
    departureAirport: {type: String, required: true},
    arrivalAirport: {type: String, required: true},
    userId: {type: mongoose.Schema.ObjectId, ref: 'User', required:true},
    createdAt: {type: Date, default: Date.now, required: true}
});

Vacation = mongoose.model('Vacation', vacationSchema);
module.exports = Vacation;
