'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SipPeerSchema = new Schema({
    name: String,
    signalingAddress: {type: String, required: true},
    signalingPort: Number,
});

module.exports = mongoose.model('SipPeer', SipPeerSchema);