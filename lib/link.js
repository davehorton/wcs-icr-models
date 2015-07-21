'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var hat = require('hat');


var populateInstanceData = function( data, purpose, duration ) {
  return {
    hash: hat(),
    purpose: purpose,
    user: mongoose.Types.ObjectId(typeof data === 'object' ? data._id : data),
    createdOn: Date.now(),
    expiresOn: (typeof duration === 'number') ? (new Date( Date.now() + (duration || Number.MAX_VALUE))) : duration
  } ;
}

var transactionSchema = new Schema({
  transaction_date: {type: Date, 'default': Date.now },
  transaction_type: {type: String, enum: ['sent', 'clicked']}
}) ;

var LinkSchema = new Schema({
  hash: {type: String, required: true, index: { unique: true}},
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdOn: {type: Date, default: Date.now},
  expiresOn: Date,
  purpose: {type: String, enum: ['new-user','reset-password'], required: true},
  transactions: [ transactionSchema ]
}) ;

LinkSchema.statics.createNewUserLink = function( user, duration ) {
  var newLink = new this( populateInstanceData(user, 'new-user', duration ) ) ;
  return newLink ;
}
LinkSchema.statics.createResetPasswordLink = function( user, duration ) {
  var newLink = new this( populateInstanceData(user, 'reset-password', duration ) ) ;
  return newLink ;
}
LinkSchema.statics.createLink = function(purpose, user, duration) {
  var newLink = new this( populateInstanceData(user, purpose, duration ) ) ;
  return newLink;
}

module.exports = mongoose.model('Link', LinkSchema);
