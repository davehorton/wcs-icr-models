'use strict';

var mongoose = require('mongoose') ;
var Schema = mongoose.Schema;


var termSchema = new mongoose.Schema({
    terminatingAddress: String,
    startTime: {type: Date, required: true},
    connectTime: Date,
    endTime: Date,
    finalStatus: Number,
    trunk: {type: Schema.Types.ObjectId, ref: 'Trunk', index: true },
    forwardNumber: String,
    rawInvite: {type: String, required: true},
    rawResponse: String
}) ;

var CdrSchema = new Schema({
    originatingAddress: {type: String, required: true},
    terminatingAddress: String,
    proxyAddress: {type:String, required: true},
    startTime: {type: Date, required: true},
    connectTime: Date,
    endTime: Date,
    duration: {type: Number, default: 0},
    finalStatus: Number,
    callId: {type: String, required: true},
    fromTag: {type: String, required: true},
    toTag: String,
    callingNumber: String,
    calledNumber: {type: String, required: true},
    dnis: {type: String},
    customer: {type: Schema.Types.ObjectId, ref: 'Customer', index: true },
    callplan: {type: Schema.Types.ObjectId, ref: 'Callplan'},
    scenario: {type: String, default: 'default', required: true},
    trunk: {type: Schema.Types.ObjectId, ref: 'Trunk', index: true },
    forwardNumber: String,
    terminationReason: {type: String},
    terminationAttempts: [termSchema],
    rawInvite: {type: String, required: true},
    rawResponse: String,
    tags: { type: [String] },
}) ;

module.exports = mongoose.model('Cdr', CdrSchema);
