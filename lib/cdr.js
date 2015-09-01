'use strict';

var mongoose = require('mongoose') ;
var Schema = mongoose.Schema;


var termSchema = new mongoose.Schema({
    startTime: {type: Date, required: true},
    connectTime: Date,
    endTime: Date,
    finalStatus: Number,
    trunk: {type: Schema.Types.ObjectId, ref: 'Trunk', index: true },
    rawInvite: {type: String, required: true},
    rawResponse: String
}) ;

var CdrSchema = new Schema({
    callingNumber: {type: String, required: true},
    calledNumber: {type: String, required: true},
    originatingAddress: {type: String, required: true},
    proxyAddress: {type:String, required: true},
    callId: {type: String, required: true},
    fromTag: {type: String, required: true},
    rawInvite: {type: String, required: true},
    startTime: {type: Date, required: true},
    connectTime: Date,
    endTime: Date,
    duration: {type: Number, default: 0},
    finalStatus: Number,
    customer: {type: Schema.Types.ObjectId, ref: 'Customer', index: true },
    trunk: {type: Schema.Types.ObjectId, ref: 'Trunk', index: true },
    terminatingIpAddress: String,
    terminationReason: {type: String},
    toTag: String,
    rawResponse: String,
    terminationAttempts: [termSchema]
}) ;

module.exports = mongoose.model('Cdr', CdrSchema);