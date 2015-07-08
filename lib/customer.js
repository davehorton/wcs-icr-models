'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var states = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 
'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 
'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 
'WA', 'WV', 'WI', 'WY'] ;

var CustomerSchema = new Schema({
  name: {type: String, required: true},
  abbrev: {type:String, unique: true},
  descr: String,
  active: {type: Boolean, default: true},
  address: {
    line1: String,
    line2: String,
    city: String,
    state: {type: String, enum: states},
    zipcode: String
  },
  contact: {
    name: String,
    email: String,
    phone: String
  }
});

module.exports = mongoose.model('Customer', CustomerSchema);