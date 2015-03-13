'use strict';

let client = require('twilio')(process.env.TWILIO_PUBLIC_KEY, process.env.TWILLIO_PRIVATE_KEY);


class Text {
  static send(to, body, cb){
    client.messages.create({
      body: body,
      to:to,
      from: '+14159428838'
    }, cb);
  }
}

module.exports = Text;
