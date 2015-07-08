'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CallplanSchema = new Schema({
    name: {type: String, index: true, default: 'untitled'},
    descr: String,
    customer: {type: Schema.Types.ObjectId, ref: 'Customer', index: true },
    tags: [{type: String, index: true}],
    revisions: [{
        notes: String,
        createdOn: {type: Date, default: Date.now},
        createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
        defaultPstn: {type: String, index: true},
        defaultTrunks: [{type: Schema.Types.ObjectId, ref: 'Trunk'}]
    }]
}) ;


module.exports = mongoose.model('Callplan', CallplanSchema);